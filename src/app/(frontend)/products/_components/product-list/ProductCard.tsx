/* eslint-disable @next/next/no-img-element */

import { CircleCheckBig, ShoppingCart } from 'lucide-react'

import { Button } from '../../../../../components/FormElements/button'
import { GetMainImageUrl } from '@/payload/utilities/productUtils'
import Link from 'next/link'
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

  return (
    <div className="flex flex-col h-full">
      <Link href={`/product/${product.slug}`} className="relative group">
        <div className="relative">
          {imageUrl ? (
            <img
              src={GetMainImageUrl(product as unknown as Product)}
              sizes="100vw"
              className="w-full h-auto mb-2 rounded-lg p-4"
              alt="Product Image"
            />
          ) : (
            <img
              alt="Missing produt image"
              src="data:image/jpeg;base64,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"
            />
          )}
          <div className="absolute bottom-0 left-0 w-full h-32 rounded-b-lg"></div>
          <p className="absolute bottom-2 right-2 text-black font-sans text-lg">
            {formatCurrency(product.price)}
          </p>
        </div>
      </Link>
      <p className="text-sm leading-4 font-semibold">{product.name}</p>
      <div className="flex justify-center mt-auto">
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
