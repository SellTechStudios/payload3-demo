import type { Product, ProductsShowcaseBlock as ProductsShowcaseProps } from '@/payload-types'

import { ProductCard } from '@/components/Product/ProductCard'
import React from 'react'

type Props = Omit<ProductsShowcaseProps, 'id' | 'blockType' | 'blockName'> & {
  className?: string
}

export const ProductsShowcaseBlock: React.FC<Props> = (props: Props) => {
  const { title, products } = props

  return (
    <div className={props.className}>
      <div className="prose">
        <h3>{title}</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {Array.isArray(products) &&
          products
            .filter((p) => typeof p === 'object')
            .map((p: Product) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
