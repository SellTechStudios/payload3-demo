/* eslint-disable @next/next/no-img-element */
'use client'

import { ProductDetails } from '@/db/products/detailsQueries'
import { useCart } from '@/providers/Cart'
import { useMemo } from 'react'

type ProductQuantitySelectorProps = {
  product?: ProductDetails
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

    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1

    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)

    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  if (!hasInitializedCart) {
    return null
  }

  return (
    <div className="border border-gray-500 grid grid-cols-[45px_1fr_45px] items-center h-11 max-w-[120px] self-center box-content">
      <button
        className="flex justify-center w-full h-full cursor-pointer bg-white"
        onClick={decrementQty}
      >
        <img src="/assets/icons/minus.svg" alt="minus" width={24} height={24} className="m-auto" />
      </button>

      <input
        type="text"
        className="text-center h-full w-full min-w-[30px] border-none outline-none text-lg font-bold self-center"
        value={quantity}
        onChange={enterQty}
      />

      <button className="self-center w-full h-full cursor-pointer bg-white" onClick={incrementQty}>
        <img src="/assets/icons/plus.svg" alt="plus" width={24} height={24} className="m-auto" />
      </button>
    </div>
  )
}
