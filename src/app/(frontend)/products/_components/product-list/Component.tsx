import { LoadingShimmer } from '@/components/LoadingShimmer'
import { ProductsListClient } from './Component.Client'
import { Suspense } from 'react'
import { productQueries } from '@/db'

export type ListTypes = 'all' | 'new' | 'specialOffer' | 'incategory' | 'quicksearch'

export type ProductsListProps =
  | {
      listType: 'all' | 'new' | 'specialOffer'
    }
  | {
      listType: 'incategory'
      categoryId: string
    }
  | {
      listType: 'quicksearch'
      searchString: string
    }

export const ProductsList = async (props: ProductsListProps) => {
  const products = await productQueries.fetchProducts(props)

  return (
    <Suspense fallback={<LoadingShimmer />}>
      <ProductsListClient products={products} />
    </Suspense>
  )
}
