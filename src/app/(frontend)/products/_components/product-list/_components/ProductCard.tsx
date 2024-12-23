/* eslint-disable @next/next/no-img-element */

import { CircleCheckBig, ShoppingCart } from 'lucide-react'

import { Button } from '../../../../../../components/FormElements/button'
import { GetMainImageUrl } from '@/payload/utilities/productUtils'
import Link from 'next/link'
import { Product } from '@/payload-types'
import { ProductItem } from '@/db/products/searchQueries'
import { formatCurrency } from '@/utilities/formatPrice'
import { useCart } from '@/providers/Cart'

type ProductProps = {
  product: ProductItem
}

export const ProductCard: React.FC<ProductProps> = ({ product }: ProductProps) => {
  const { addItemToCart, isProductInCart } = useCart()
  const isInCart = isProductInCart(product.id)

  return (
    <div className="flex flex-col h-full">
      <Link href={`/product/${product.slug}`} className="relative group">
        <div className="relative">
          <img
            src={GetMainImageUrl(product as unknown as Product)}
            sizes="100vw"
            className="w-full h-auto mb-2 rounded-lg p-4"
            alt="Product Image"
          />
          <div className="absolute bottom-0 left-0 w-full h-32 rounded-b-lg"></div>
          <p className="absolute bottom-2 right-2 text-black font-sans text-lg">
            {formatCurrency(product.price)}
          </p>
        </div>
      </Link>
      <p className="text-sm leading-4 font-semibold">{product.name}</p>
      <div className="flex justify-center mt-auto">
        <Button
          onClick={!isInCart ? () => addItemToCart({ product, quantity: 1 }) : undefined}
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
