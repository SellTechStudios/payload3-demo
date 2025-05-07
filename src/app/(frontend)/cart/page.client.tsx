'use client'

import CartItemsList from '@/components/Cart/CartItemsList'
import { Button } from '@/payload/blocks/Form/_ui/button'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'
import { useTranslations } from 'next-intl'
import React from 'react'

export const CartPage: React.FC = () => {
  const { user } = useAuth()
  const { cartTotal, cartIsEmpty } = useCart()
  const t = useTranslations('Cart')
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-16 my-8">
      <CartItemsList />

      <div className="flex flex-col gap-4 p-6 border border-gray-300">
        <div className="flex items-center justify-between pb-4 border-b border-gray-300">
          <h6 className="text-lg font-semibold">{t('Summary')}</h6>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-300">
          <p className="text-lg">{t('Delivery')}</p>
          <p className="text-lg">0 zł</p>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-300">
          <p className="text-lg">{t('Total')}</p>
          <p className="text-lg font-semibold">{cartTotal.formatted}</p>
        </div>

        {!cartIsEmpty && (
          <Button href={user ? '/checkout' : '/login?redirect=%2Fcheckout'} className="w-full">
            {user ? t('GoToPayment') : t('LoginToContinue')}
          </Button>
        )}
      </div>
    </div>
  )
}
