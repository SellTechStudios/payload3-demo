'use client'

import { ProductCard } from './ProductCard'
import { ProductItem } from '@/db/products/queries.types'

export type ProductListClientProps = {
  products: ProductItem[]
}

export const ProductsListClient = (props: ProductListClientProps) => {
  const { products } = props

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((p, index) => (
        <div key={index} className="flex flex-col justify-between">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  )
}
