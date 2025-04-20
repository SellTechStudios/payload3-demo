'use client'
/* eslint-disable @next/next/no-img-element */

import { GetMainImageUrl } from '@/payload/utilities/productUtils'
import { Product } from '@/payload-types'
import { ProductItem } from '@/db/products/queries.types'
import ReviewStars from '../ReviewStars/ReviewStars'
import { formatCurrency } from '@/utilities/formatPrice'

type ProductProps = {
  product: ProductItem
}

export const ProductRow: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const imageUrl = GetMainImageUrl(product as unknown as Product)

  return (
    <a
      className="group relative flex flex-row gap-4 hover:bg-slate-100 overflow-hidden"
      href={`/product/${product.slug}`}
    >
      <img src={imageUrl} className="w-20 h-20 p-2 object-scale-down" alt={product.title} />
      <div className="flex flex-col gap-2 py-2">
        <h5 className="text-md line-clamp-1 tracking-tight">{product.title}</h5>
        <span className="text-sm font-bold">{formatCurrency(product.price)}</span>

        <ReviewStars className="scale-75" rating={product.rating} />
      </div>
    </a>
  )
}
