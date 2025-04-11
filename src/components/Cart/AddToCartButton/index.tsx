'use client'

import { CircleCheckBig, ShoppingCart } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Button } from '@/payload/blocks/Form/_ui/button'
import { Product } from '@/payload-types'
import { cn } from '@/utilities/cn'
import { useCart } from '@/providers/Cart'

export const AddToCartButton: React.FC<{
  product: Product
}> = (props) => {
  const { product } = props

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
          ? () => {
              addItemToCart(product)
            }
          : undefined
      }
    >
      {!isInCart && <ShoppingCart className="mr-3" />}
      {isInCart && <CircleCheckBig className="mr-3" />}
      {isInCart ? `Pokaż w koszyku` : `Dodaj do koszyka`}
    </Button>
  )
}
