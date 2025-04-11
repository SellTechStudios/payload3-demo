/* eslint-disable @next/next/no-img-element */
'use client'

import { CartItem } from '@/providers/Cart/reducer'
import { Product } from '@/payload-types'
import { useCart } from '@/providers/Cart'
import { useMemo } from 'react'

type ProductQuantitySelectorProps = {
  product?: Product
}

export const ProductQuantitySelector: React.FC<ProductQuantitySelectorProps> = ({
  product,
}: ProductQuantitySelectorProps) => {
  const { cart, addItemToCart, hasInitializedCart } = useCart()
  const currentCartProduct = cart?.items?.find((item) => {
    return typeof item.product !== 'string' && item.product?.id === product?.id
  })

  const quantity = useMemo(() => {
    return currentCartProduct?.quantity || 0
  }, [currentCartProduct?.quantity])

  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1

    addItemToCart({ product, quantity: Number(updatedQty) } as CartItem)
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1

    addItemToCart({ product, quantity: Number(updatedQty) } as CartItem)
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)

    addItemToCart({ product, quantity: Number(updatedQty) } as CartItem)
  }

  if (!hasInitializedCart) {
    return null
  }

  return (
    <div className="box-content items-center self-center grid grid-cols-[45px_1fr_45px] border border-gray-500 max-w-[120px] h-11">
      <button
        className="flex justify-center bg-white w-full h-full cursor-pointer"
        onClick={decrementQty}
      >
        <img src="/assets/icons/minus.svg" alt="minus" width={24} height={24} className="m-auto" />
      </button>

      <input
        type="text"
        className="self-center border-none outline-none w-full min-w-[30px] h-full font-bold text-lg text-center"
        value={quantity}
        onChange={enterQty}
      />

      <button className="self-center bg-white w-full h-full cursor-pointer" onClick={incrementQty}>
        <img src="/assets/icons/plus.svg" alt="plus" width={24} height={24} className="m-auto" />
      </button>
    </div>
  )
}
