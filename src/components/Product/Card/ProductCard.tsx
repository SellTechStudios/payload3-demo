'use client'
/* eslint-disable @next/next/no-img-element */

import { Heart } from 'lucide-react'
import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa6'
import { AddToCartButton } from '@/components/Cart/AddToCartButton'
import { ProductItem } from '@/db/products/queries.types'
import { Product } from '@/payload-types'
import { cn } from '@/payload/utilities/cn'
import { GetMainImageUrl } from '@/payload/utilities/productUtils'
import { useAuth } from '@/providers/Auth'
import { formatCurrency } from '@/utilities/formatPrice'
import ReviewStars from '../ReviewStars/ReviewStars'

type ProductProps = {
  product: ProductItem
}

export const ProductCard: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const { hasFavoriteProduct, toggleFavoriteProduct, status } = useAuth()
  const [isTogglingFavourite, setIsTogglingFavourite] = useState(false)

  const imageUrl = GetMainImageUrl(product as unknown as Product)
  const percentageOff =
    product.pricePrevious && product.pricePrevious > product.price
      ? Math.round(((product.pricePrevious - product.price) / product.pricePrevious) * 100)
      : null

  const isFavorite = hasFavoriteProduct(product.id)

  const onFavoriteClick = async () => {
    setIsTogglingFavourite(true)
    await toggleFavoriteProduct(product)
    setIsTogglingFavourite(false)
  }

  return (
    <div className="relative flex flex-col bg-white shadow-md border border-gray-100 rounded-lg">
      <a
        className="group relative flex mx-3 mt-3 rounded-xl overflow-hidden"
        href={`/product/${product.slug}`}
      >
        <img
          src={imageUrl}
          className="w-full h-60 object-scale-down group-hover:scale-105 transition-transform duration-100 ease-linear"
          alt={product.title}
        />

        {percentageOff && (
          <span className="top-0 left-0 absolute bg-black m-2 px-2 rounded-full font-medium text-white text-sm text-center">
            {percentageOff}% OFF
          </span>
        )}
      </a>
      <div className="mt-8 px-5 pb-5">
        {status == 'loggedIn' && (
          <div
            onClick={onFavoriteClick}
            className="top-2 right-2 absolute bg-white hover:bg-slate-200 p-2 rounded-full cursor-pointer"
          >
            <Heart
              className={cn(
                isFavorite ? 'fill-gray-800' : 'fill-white',
                isTogglingFavourite ? 'hidden' : 'block',
                'hover:scale-110 text-slate-900 transition-transform duration-100 ease-linea',
              )}
              size={20}
            />
            <FaSpinner
              size={20}
              className={cn(isTogglingFavourite ? 'block animate-spin' : 'hidden')}
            />
          </div>
        )}
        <a href={`/product/${product.slug}`} className="flex items-start h-16 overflow-hidden">
          <h5 className="text-lg line-clamp-2 tracking-tight">{product.title}</h5>
        </a>
        <div className="flex justify-between items-center mt-4 mb-5">
          <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
            <span className="font-bold text-slate-900 text-3xl">
              {formatCurrency(product.price)}
            </span>
            {product.pricePrevious && (
              <span className="text-slate-900 text-sm line-through">
                {formatCurrency(product.pricePrevious)}
              </span>
            )}
          </div>
        </div>
        <div className="mb-4">
          <ReviewStars rating={product.rating} />
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  )
}
