'use client'
/* eslint-disable @next/next/no-img-element */

import { GetMainImageUrl } from '@/payload/utilities/productUtils'
import { Product } from '@/payload-types'
import { ProductItem } from '@/db/products/queries.types'
import { formatCurrency } from '@/utilities/formatPrice'

type ProductProps = {
  product: ProductItem
}

export const ProductRow: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const imageUrl = GetMainImageUrl(product as unknown as Product)

  return (
    <div className="relative flex flex-row hover:bg-slate-100">
      <a className="group relative flex gap-4 overflow-hidden" href={`/product/${product.slug}`}>
        <img src={imageUrl} className="w-20 h-20 object-scale-down" alt={product.title} />
        <div className="flex flex-col gap-2">
          <h5 className="text-lg line-clamp-1 tracking-tight">{product.title}</h5>
          <span className="text-sm">{formatCurrency(product.price)}</span>
        </div>
      </a>
    </div>
  )
}
