/* eslint-disable @next/next/no-img-element */

import { CircleCheckBig, ShoppingCart } from 'lucide-react'

import { Button } from '../../../../../components/FormElements/button'
import { GetMainImageUrl } from '@/payload/utilities/productUtils'
import { Product } from '@/payload-types'
import { ProductItem } from '@/db/products/queries.types'
import { formatCurrency } from '@/utilities/formatPrice'
import { useCart } from '@/providers/Cart'

type ProductProps = {
  product: ProductItem
}

export const ProductCard: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const { addItemToCart, isProductInCart } = useCart()
  const isInCart = isProductInCart(product.id)
  const imageUrl = GetMainImageUrl(product as unknown as Product)
  const percentageOff = product.pricePrevious
    ? Math.round(((product.pricePrevious - product.price) / product.pricePrevious) * 100)
    : null

  return (
    <div className="relative flex  flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <a
        className="relative mx-3 mt-3 flex overflow-hidden rounded-xl group"
        href={`/product/${product.slug}`}
      >
        <img
          src={imageUrl}
          className="object-scale-down w-full h-60 transition-transform duration-300 group-hover:scale-105"
          alt={product.title}
        />

        {percentageOff && (
          <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
            {percentageOff}% OFF
          </span>
        )}
      </a>
      <div className="mt-8 px-5 pb-5">
        <a href={`/product/${product.slug}`} className="h-16 overflow-hidden flex items-start">
          <h5 className="text-lg tracking-tight line-clamp-2">{product.title}</h5>
        </a>
        <div className="mt-4 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              {formatCurrency(product.price)}
            </span>
            <span className="text-sm text-slate-900 line-through ml-4">
              {formatCurrency(product.pricePrevious)}
            </span>
          </p>
          {/* <div className="flex items-center">
        <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <svg aria-hidden="true" className="h-5 w-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
      </div> */}
        </div>
        <Button
          onClick={
            !isInCart
              ? () => addItemToCart({ product: product as unknown as Product, quantity: 1 })
              : undefined
          }
          href={isInCart ? '/cart' : undefined}
          className="mt-2 w-full"
        >
          {!isInCart && <ShoppingCart className="mr-3 block sm:hidden xl:block" />}
          {isInCart && <CircleCheckBig className="mr-3 block sm:hidden xl:block" />}
          <span className="hidden sm:block ml-0 xl:ml-2">
            {isInCart ? 'Pokaż w koszyku' : 'Dodaj do koszyka'}
          </span>
        </Button>
      </div>
    </div>
  )
}
