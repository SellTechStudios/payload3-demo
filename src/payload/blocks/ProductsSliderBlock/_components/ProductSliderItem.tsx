/* eslint-disable @next/next/no-img-element */

import { CircleCheckBig, ShoppingCart } from 'lucide-react'

import { ProductSliderItem } from '@/db/products/sliderQueries'
import { Button } from '@/payload/blocks/Form/_ui/button'
import { useCart } from '@/providers/Cart'
import { formatCurrency } from '@/utilities/formatPrice'
import { HeartIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type ProductSliderElementProps = {
  product: ProductSliderItem
}

export const ProductSliderElement: React.FC<ProductSliderElementProps> = ({
  product,
}: ProductSliderElementProps) => {
  const { addItemToCart, isProductInCart } = useCart()
  const isInCart = isProductInCart(product.id)

  return (
    <div className="relative h-full group/container bg-white rounded-lg">
      <Link
        prefetch={false}
        href={`/product/${product.slug}`}
        className="flex flex-col items-center self-stretch justify-between h-full transition-all duration-200 ease-in-out rounded-lg"
      >
        <img
          className="object-cover w-auto h-[350px] rounded-t-lg"
          src={product.imageUrl}
          width={100}
          height={280}
          alt="Product Image"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        />

        <div className="flex flex-col p-2 transition-all duration-200 ease-in-out flex-1 px-4">
          <p className="h-full text-sm line-clamp-3">{product.name}</p>
          <p className="mt-2 font-bold text-red-500">{formatCurrency(product.price)}</p>
        </div>
      </Link>
      <div className="absolute inset-0 bg-slate-950 bg-opacity-40 opacity-0 group-hover/container:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none rounded-lg"></div>

      <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 ease-in-out opacity-0 group-hover/container:opacity-100">
        <div className="flex flex-col items-center gap-2">
          <Button
            onClick={!isInCart ? () => addItemToCart({ product, quantity: 1 }) : undefined}
            href={isInCart ? '/cart' : undefined}
            className="max-w-[200px] w-full"
          >
            {!isInCart && <ShoppingCart className="mr-3" />}
            {isInCart && <CircleCheckBig className="mr-3" />}
            {isInCart ? `Pokaż w koszyku` : `Dodaj do koszyka`}
          </Button>

          <Button className="max-w-[200px] w-full">
            <HeartIcon className="size-5 mr-3" />
            Dodaj do ulubionych
          </Button>
        </div>
      </div>
    </div>
  )
}
