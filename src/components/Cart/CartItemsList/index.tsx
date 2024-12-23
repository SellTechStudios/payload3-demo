'use client'

import CartItem from './CartItem'
import EmptyCart from './CartEmpty'
import { LoadingShimmer } from '@/components/LoadingShimmer'
import React from 'react'
import { useCart } from '@/providers/Cart'

const CartItemsList = () => {
  const { hasInitializedCart, cart, cartIsEmpty, addItemToCart } = useCart()

  if (!hasInitializedCart) {
    return (
      <div className="my-8">
        <LoadingShimmer />
      </div>
    )
  }

  if (cartIsEmpty) {
    return <EmptyCart />
  }

  return (
    <div>
      {/* CART LIST HEADER */}
      <div className="hidden sm:grid sm:grid-cols-[100px_3fr_1fr_1fr_1fr] gap-6 mb-2">
        <p>Produkt</p>
        <p></p>
        <p className="text-center">Ilość</p>
        <p className="text-center">Łącznie</p>
        <p className="text-center">Usuń</p>
      </div>
      {/* CART ITEM LIST */}
      <ul className="border-t border-gray-300">
        {cart?.items?.map((item) => {
          if (item.product && typeof item.product === 'object') {
            const {
              quantity,
              product,
              product: { id, title, mediaImages },
            } = item

            return (
              <CartItem
                key={id}
                product={product}
                title={title}
                image={mediaImages?.[0]?.url || ''}
                qty={quantity}
                addItemToCart={addItemToCart}
              />
            )
          }
          return null
        })}
      </ul>
    </div>
  )
}

export default CartItemsList
