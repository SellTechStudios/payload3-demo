import CartItemsList from '@/components/Cart/CartItemsList'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

export const CartSummary: React.FC = () => {
  return (
    <aside className="basis-1/4 p-4 bg-gray-200 rounded-tr-lg rounded-bl-lg ">
      <header className="flex flex-row gap-2 items-center">
        <ShoppingCart className="size-6" />
        <h4>Koszyk</h4>
      </header>
      <CartItemsList />
    </aside>
  )
}
