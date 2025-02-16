'use client'

import { ProductCard } from './_components/ProductCard'
import { ProductItem } from '@/db/products/searchQueries'

export type ProductListClientProps = {
  products: ProductItem[]
}

export const ProductsListClient = (props: ProductListClientProps) => {
  const { products } = props

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p, index) => (
        <div key={index} className="flex flex-col justify-between">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}
