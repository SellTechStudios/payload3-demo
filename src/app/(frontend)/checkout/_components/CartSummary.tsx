'use client'

import CartItemsList from '@/components/Cart/CartItemsList'
import { Button } from '@/payload/blocks/Form/_ui/button'

import { ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface CartSummaryProps {
  onPlaceOrderAction: () => void
}

export const CartSummary: React.FC<CartSummaryProps> = ({ onPlaceOrderAction }) => {
  const t = useTranslations('Cart')
  return (
    <aside className="basis-1/4 p-4 bg-gray-200 rounded-tr-lg rounded-bl-lg">
      <header className="flex flex-row gap-2 items-center mb-4">
        <ShoppingCart className="size-6" />
        <h4>{t('Cart')}</h4>
      </header>
      <CartItemsList />
      <Button onClick={onPlaceOrderAction} className="mt-4 w-full">
        {t('PlaceOrder')}
      </Button>
    </aside>
  )
}
