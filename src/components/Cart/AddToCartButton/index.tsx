'use client'

import { CircleCheckBig, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { ProductItem } from '@/db/products/queries.types'
import { Product } from '@/payload-types'
import { Button } from '@/payload/blocks/Form/_ui/button'
import { useCart } from '@/providers/Cart'
import { CartItem } from '@/providers/Cart/reducer'
import { cn } from '@/utilities/cn'

export const AddToCartButton: React.FC<{ product: ProductItem }> = ({ product }) => {
  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()
  const [isInCart, setIsInCart] = useState<boolean>()

  useEffect(() => {
    setIsInCart(isProductInCart(product.id))
  }, [isProductInCart, product, cart])

  return (
    <Button
      href={isInCart ? '/cart' : undefined}
      className={cn(
        'transition-opacity duration-100',
        !hasInitializedCart && 'opacity-0 invisible',
      )}
      onClick={
        !isInCart
          ? () => addItemToCart({ product: product as unknown as Product, quantity: 1 } as CartItem)
          : undefined
      }
    >
      {!isInCart && <ShoppingCart className="mr-3" />}
      {isInCart && <CircleCheckBig className="mr-3" />}
      {isInCart ? 'Pokaż w koszyku' : 'Dodaj do koszyka'}
    </Button>
  )
}
