'use client'

import { ProductCard } from '@/components/Product/Card/ProductCard'
import { ProductItem } from '@/db/products/queries.types'

export type ProductListClientProps = {
  products: ProductItem[]
}

export const ProductsListClient = (props: ProductListClientProps) => {
  const { products } = props

  return (
    <>
      <div className="gap-4 grid grid-cols-2 lg:grid-cols-3">
        {products.map((p, index) => (
          <div key={index} className="flex flex-col justify-between">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </>
  )
}
