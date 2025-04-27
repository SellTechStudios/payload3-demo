import { LoadingShimmer } from '@/components/LoadingShimmer'
import { productQueries } from '@/db'
import { SearchRequest } from '@/db/products/queries.types'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { FacetNavigationClient } from '../_components/facet-navigation/FacetNavigation.Client'
import { ProductsListClient } from '../_components/product-list/Component.Client'

interface PageProps {
  params: Promise<{ filterType: 'all' | 'new' | 'bestseller' | 'quicksearch' }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function ProductList({ params, searchParams }: PageProps) {
  const filterType = (await params).filterType
  const searchString = (await searchParams).searchString
  const pageSize = parseInt((await searchParams).pageSize || '9') || 9
  const page = parseInt((await searchParams).page || '1') || 1

  const searchRequest: SearchRequest = {
    type: filterType,
    pageSize,
    page,
  }

  // Validate and map the route parameters to our union type
  switch (filterType) {
    case 'all':
    case 'new':
    case 'bestseller':
      break

    case 'quicksearch':
      searchRequest.searchString = searchString
      break

    default:
      return notFound()
  }

  const queryResponse = await productQueries.fetchProducts(searchRequest)
  const facets = await productQueries.fetchFacets(searchRequest)

  return (
    <div className="md:grid md:grid-cols-12 md:gap-16">
      <div className="col-span-12 md:col-span-3 hidden md:block">
        <Suspense fallback={<LoadingShimmer />}>
          <FacetNavigationClient facets={facets} />
        </Suspense>
      </div>
      <div className="col-span-12 md:col-span-9">
        <Suspense fallback={<LoadingShimmer />}>
          <ProductsListClient
            products={queryResponse.products}
            total={queryResponse.total}
            currentPage={page}
            pageSize={pageSize}
            facets={facets}
          />
        </Suspense>
      </div>
    </div>
  )
}
