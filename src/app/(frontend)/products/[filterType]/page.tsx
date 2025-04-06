import { categoryQueries, productQueries } from '@/db'

import { Container } from '@/components/Container'
import { FacetNavigationClient } from '../_components/facet-navigation/FacetNavigation.Client'
import { LoadingShimmer } from '@/components/LoadingShimmer'
import { ProductsListClient } from '../_components/product-list/Component.Client'
import { SearchRequest } from '@/db/products/queries.types'
import { Suspense } from 'react'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ filterType: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function ProductList({ params, searchParams }: PageProps) {
  const filterType = (await params).filterType
  const categoryId = (await searchParams).categoryId
  const searchString = (await searchParams).searchString

  let title: string
  const searchRequest: SearchRequest = {}

  // Validate and map the route parameters to our union type
  switch (filterType) {
    case 'all':
      title = 'Wszystkie Produkty'
      break

    case 'new':
      title = 'Nowości'
      break

    case 'specialOffer':
      title = 'Oferty Specjalne'
      break

    case 'category':
      if (!categoryId) {
        return notFound()
      }
      const category = await categoryQueries.fetchById(categoryId)
      title = `Produkty w kategorii ${category.name}`
      searchRequest.categoryId = categoryId
      break

    case 'quicksearch':
      title = searchString ? `Wyniki wyszukiwania dla '${searchString}'` : 'Wszystkie Produkty'
      searchRequest.searchString = searchString
      break

    default:
      return notFound()
  }

  const products = await productQueries.fetchProducts(searchRequest)
  const facets = await productQueries.fetchFacets('Sample')

  return (
    <Container className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-3">
        <Suspense fallback={<LoadingShimmer />}>
          <FacetNavigationClient facets={facets} />
        </Suspense>
      </div>
      <div className="col-span-12 md:col-span-9">
        <h2 className="col-span-full text-2xl">{title}</h2>
        <Suspense fallback={<LoadingShimmer />}>
          <ProductsListClient products={products} />
        </Suspense>
      </div>
    </Container>
  )
}
