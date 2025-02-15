/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { RemoveFromCartButton } from '@/components/Cart/RemoveFromCartButton'
import { formatCurrency } from '@/utilities/formatPrice'

const CartItem = ({ product, title, image, qty, addItemToCart }) => {
  const [quantity, setQuantity] = useState(qty)

  return (
    <li className="grid grid-cols-[100px_3fr_1fr_1fr_1fr] py-6 gap-6 border-b border-gray-300">
      <Link href={`/product/${product.slug}`} className="relative h-full">
        {!image && <span>Brak obrazka</span>}
        {image && typeof image == 'string' && (
          <img
            src={image}
            alt="zdjęcie produktu"
            width={100}
            height={100}
            className="object-contain max-w-full aspect-square"
          />
        )}
      </Link>

      <div className="self-center line-clamp-3">{title}</div>
      <QuantityButton
        quantity={quantity}
        setQuantity={setQuantity}
        addItemToCart={addItemToCart}
        product={product}
      />

      <div className="flex items-center justify-center">
        {formatCurrency(product.price * quantity)}
      </div>
      <div className="flex self-center justify-center">
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

const QuantityButton = ({ quantity, setQuantity, addItemToCart, product }) => {
  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)

    setQuantity(updatedQty)
    addItemToCart({ product, quantity: Number(updatedQty) })
  }
  return (
    <div className="border border-gray-500 grid grid-cols-[45px_1fr_45px] items-center h-11 max-w-[120px] self-center box-content">
      <button
        className="flex justify-center w-full h-full cursor-pointer bg-white"
        onClick={decrementQty}
      >
        <Image
          src="/assets/icons/minus.svg"
          alt="minus"
          width={24}
          height={24}
          className="m-auto"
        />
      </button>

      <input
        type="text"
        className="text-center h-full w-full min-w-[30px] border-none outline-none text-lg font-bold self-center"
        value={quantity}
        onChange={enterQty}
      />

      <button className="self-center w-full h-full cursor-pointer bg-white" onClick={incrementQty}>
        <Image src="/assets/icons/plus.svg" alt="plus" width={24} height={24} className="m-auto" />
      </button>
    </div>
  )
}

export default CartItem
