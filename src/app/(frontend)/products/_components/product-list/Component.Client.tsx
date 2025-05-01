'use client'

import { Pagination } from '@/components/Pagination'
import { ProductCard } from '@/components/Product/Card/ProductCard'
import { FacetedNavigation, ProductItem } from '@/db/products/queries.types'
import { Filter } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { FiltersModal } from './FiltersModal'

export type ProductListClientProps = {
  products: ProductItem[]
  total: number
  pageSize: number
  currentPage: number
  facets: FacetedNavigation
}

export const ProductsListClient = (props: ProductListClientProps) => {
  const { products, total, currentPage, pageSize, facets } = props
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const t = useTranslations('ProductList')
  return (
    <>
      <div className="flex mb-4 md:hidden">
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="border border-gray-300 rounded-full py-2 px-4 text-sm text-gray-700 hover:bg-gray-100"
        >
          <Filter className="w-4 h-4 inline-block mr-2" />
          {t('Filters')}
        </button>
      </div>
      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p, index) => (
          <div key={index} className="flex flex-col justify-between">
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      <Pagination page={currentPage} totalItems={total} pageSize={pageSize} className="my-4" />
      <FiltersModal
        facets={facets}
        isOpen={isFiltersOpen}
        onCloseAction={() => setIsFiltersOpen(false)}
      />
    </>
  )
}
