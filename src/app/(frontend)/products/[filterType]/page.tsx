import { LoadingShimmer } from '@/components/LoadingShimmer'
import { productQueries } from '@/db'
import { SearchRequest } from '@/db/products/queries.types'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { z } from 'zod'
import { FacetNavigationClient } from '../_components/facet-navigation/FacetNavigation.Client'
import { ProductsListClient } from '../_components/product-list/Component.Client'
export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ filterType: 'all' | 'new' | 'bestseller' | 'quicksearch' }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

const searchParamsSchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => parseInt(val || '1')),
  pageSize: z
    .string()
    .optional()
    .transform((val) => parseInt(val || '9')),
  category: z.union([z.string(), z.array(z.string())]).optional(),
  manufacturer: z.union([z.string(), z.array(z.string())]).optional(),
  price: z.union([z.string(), z.array(z.string())]).optional(),
  searchString: z.string().optional(),
})

const getArray = (val?: string | string[]): string[] | undefined => {
  if (!val) return undefined
  return Array.isArray(val) ? val : [val]
}

export default async function ProductList({ params, searchParams }: PageProps) {
  const { filterType } = await params
  const rawParams = await searchParams

  if (!['all', 'new', 'bestseller', 'quicksearch'].includes(filterType)) {
    return notFound()
  }

  const parsed = searchParamsSchema.safeParse(rawParams)
  if (!parsed.success) {
    console.error('Invalid search params:', parsed.error.format())
    return notFound()
  }

  const { page, pageSize, category, manufacturer, price, searchString } = parsed.data

  const searchRequest: SearchRequest = {
    type: filterType,
    page,
    pageSize,
    category: getArray(category),
    manufacturer: getArray(manufacturer),
    price: getArray(price),
    searchString: filterType === 'quicksearch' ? searchString : undefined,
  }

  const [queryResponse, facets] = await Promise.all([
    productQueries.fetchProducts(searchRequest),
    productQueries.fetchFacets(searchRequest),
  ])

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
