'use client'

import { Button } from '@/payload/blocks/Form/_ui/button'
import { useCart } from '@/providers/Cart'
import { ShoppingCart } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
interface CartSummaryProps {
  onPlaceOrderAction: () => void
}

export const CartSummary: React.FC<CartSummaryProps> = ({ onPlaceOrderAction }) => {
  const t = useTranslations('Cart')
  const { cartTotal } = useCart()

  return (
    <aside className="w-full lg:w-[320px] p-4 bg-gray-100 rounded-lg shadow-sm">
      <header className="flex flex-row gap-2 items-center  border-b border-gray-300 pb-4">
        <ShoppingCart className="size-6" />
        <h4 className="text-lg font-semibold">{t('Cart')}</h4>
      </header>

      <CartItemsListCompact />

      <div className="flex justify-between px-2 py-4 font-semibold text-sm text-right bg-white mt-4 rounded">
        <p>{t('GrandTotal')}</p>
        <p>{cartTotal.formatted}</p>
      </div>

      <Button onClick={onPlaceOrderAction} className="mt-4 w-full">
        {t('PlaceOrder')}
      </Button>
    </aside>
  )
}

const CartItemsListCompact = () => {
  const { cart } = useCart()
  const t = useTranslations('Cart')

  if (!cart?.items?.length) return null

  return (
    <ul className="divide-y divide-gray-200">
      {cart.items.map((item) => {
        if (item.product && typeof item.product === 'object') {
          const {
            quantity,
            product: { id, title, mediaImages, price },
          } = item

          const imageUrl = mediaImages?.[0]?.url
          const lineTotal = price && quantity ? price * quantity : 0

          return (
            <li key={id} className="flex items-center gap-3 py-3 text-sm">
              {imageUrl && (
                <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded border">
                  <Image src={imageUrl} alt={title} fill sizes="48px" className="object-cover" />
                </div>
              )}
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-gray-800 font-medium leading-tight ">{title}</span>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>
                    {t('Quantity')}: {quantity}
                  </span>
                  <span className="text-gray-800 font-bold">
                    {t('Total')}: {lineTotal.toFixed(2)} zł
                  </span>
                </div>
              </div>
            </li>
          )
        }
        return null
      })}
    </ul>
  )
}
