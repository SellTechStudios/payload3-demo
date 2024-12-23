'use client'

import { ProductCard } from './_components/ProductCard'
import { ProductItem } from '@/db/products/searchQueries'

export type ProductListClientProps = {
  products: ProductItem[]
}

export const ProductsListClient = (props: ProductListClientProps) => {
  const { products } = props

  return (
    <>
      {products.map((p, index) => (
        <div key={index} className="flex flex-col justify-between">
          <ProductCard product={p} />
        </div>
      ))}
    </>
  )
}
