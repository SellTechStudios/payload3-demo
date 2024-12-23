'use client'

import { Button } from '@/payload/blocks/Form/_ui/button'
import CartItemsList from '@/components/Cart/CartItemsList'
import React from 'react'
import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'

export const CartPage: React.FC = () => {
  const { user } = useAuth()
  const { cartTotal } = useCart()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-16 my-8">
      <CartItemsList />

      <div className="flex flex-col gap-4 p-6 border border-gray-300">
        <div className="flex items-center justify-between pb-4 border-b border-gray-300">
          <h6 className="text-lg font-semibold">Podsumowanie</h6>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-300">
          <p className="text-lg">Dostawa</p>
          <p className="text-lg">0 zł</p>
        </div>

        <div className="flex items-center justify-between pb-4 border-b border-gray-300">
          <p className="text-lg">Łącznie</p>
          <p className="text-lg font-semibold">{cartTotal.formatted}</p>
        </div>

        <Button href={user ? '/checkout' : '/login?redirect=%2Fcheckout'} className="w-full">
          {user ? 'Przejdź do płatności' : 'Zaloguj się, aby kontynuować'}{' '}
        </Button>
      </div>
    </div>
  )
}
