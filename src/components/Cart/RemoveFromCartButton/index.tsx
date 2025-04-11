'use client'

import { Button } from '@/payload/blocks/Form/_ui/button'
import { Product } from '@/payload-types'
import React from 'react'
import { Trash2 } from 'lucide-react'
import { cn } from '@/utilities/cn'
import { useCart } from '@/providers/Cart'

export const RemoveFromCartButton: React.FC<{
  className?: string
  product: Product
}> = (props) => {
  const { className, product } = props

  const { deleteItemFromCart, isProductInCart } = useCart()

  const productIsInCart = isProductInCart(product.id)

  if (!productIsInCart) {
    return null
  }

  return (
    <Button
      variant="clear"
      onClick={() => {
        deleteItemFromCart(product.id)
      }}
      className={cn(className, 'text-red-500')}
    >
      <Trash2 />
    </Button>
  )
}
