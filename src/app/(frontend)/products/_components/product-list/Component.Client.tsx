'use client'

import { Pagination } from '@/components/Pagination'
import { ProductCard } from '@/components/Product/Card/ProductCard'
import { ProductItem } from '@/db/products/queries.types'

export type ProductListClientProps = {
  products: ProductItem[]
  total: number
  pageSize: number
  currentPage: number
}

export const ProductsListClient = (props: ProductListClientProps) => {
  const { products, total, currentPage, pageSize } = props

  return (
    <>
      <Pagination page={currentPage} totalItems={total} pageSize={pageSize} className="mb-4" />

      <div className="gap-4 grid grid-cols-2 lg:grid-cols-3">
        {products.map((p, index) => (
          <div key={index} className="flex flex-col justify-between">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <Pagination page={currentPage} totalItems={total} pageSize={pageSize} className="my-4" />
    </>
  )
}
