'use client'
/* eslint-disable @next/next/no-img-element */

import { CircleCheckBig, Heart, ShoppingCart } from 'lucide-react'

import { Button } from '@/components/FormElements/button'
import { CartItem } from '@/providers/Cart/reducer'
import { GetMainImageUrl } from '@/payload/utilities/productUtils'
import { Product } from '@/payload-types'
import { ProductItem } from '@/db/products/queries.types'
import ReviewStars from '../ReviewStars/ReviewStars'
import { cn } from '@/payload/utilities/cn'
import { formatCurrency } from '@/utilities/formatPrice'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'

type ProductProps = {
  product: ProductItem
}

export const ProductCard: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const { addItemToCart, isProductInCart } = useCart()
  const { hasFavoriteProduct, toggleFavoriteProduct } = useAuth()

  const isInCart = isProductInCart(product.id)
  const imageUrl = GetMainImageUrl(product as unknown as Product)
  const percentageOff =
    product.pricePrevious && product.pricePrevious > product.price
      ? Math.round(((product.pricePrevious - product.price) / product.pricePrevious) * 100)
      : null

  const isFavorite = hasFavoriteProduct(product.id)

  const onFavoriteClick = async () => {
    await toggleFavoriteProduct(product)
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
        <div
          onClick={onFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full  bg-white cursor-pointer hover:bg-slate-200"
        >
          <Heart
            className={cn(
              isFavorite ? 'fill-gray-800' : 'fill-white',
              'hover:scale-110 text-slate-900 transition-transform duration-100 ease-linea',
            )}
            size={20}
          />
        </div>
        <a href={`/product/${product.slug}`} className="flex items-start h-16 overflow-hidden">
          <h5 className="text-lg line-clamp-2 tracking-tight">{product.title}</h5>
        </a>
        <div className="flex justify-between items-center mt-4 mb-5">
          <p>
            <span className="font-bold text-slate-900 text-3xl">
              {formatCurrency(product.price)}
            </span>
            <span className="ml-4 text-slate-900 text-sm line-through">
              {formatCurrency(product.pricePrevious)}
            </span>
          </p>
        </div>
        <div className="mb-4">
          <ReviewStars rating={product.rating} />
        </div>
        <Button
          onClick={
            !isInCart
              ? () =>
                  addItemToCart({ product: product as unknown as Product, quantity: 1 } as CartItem)
              : undefined
          }
          href={isInCart ? '/cart' : undefined}
          className="mt-2 w-full"
        >
          {!isInCart && <ShoppingCart className="sm:hidden block xl:block mr-3" />}
          {isInCart && <CircleCheckBig className="sm:hidden block xl:block mr-3" />}
          <span className="hidden sm:block ml-0 xl:ml-2">
            {isInCart ? 'Pokaż w koszyku' : 'Dodaj do koszyka'}
          </span>
        </Button>
      </div>
    </div>
  )
}
