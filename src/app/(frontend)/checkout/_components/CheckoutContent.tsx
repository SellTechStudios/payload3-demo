'use client'

import { useAuth } from '@/providers/Auth'
import { useCart } from '@/providers/Cart'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { useInitPayment } from '../_hooks/useInitPayment'
import { CartSummary } from './CartSummary'
import { PaymentSection } from './PaymentSection'
import { ShipmentSection } from './ShipmentSection'
import { UserDataSection } from './UserDataSection'

export const CheckoutContent = () => {
  const router = useRouter()
  const { user } = useAuth()
  const { cartIsEmpty } = useCart()
  const { initPayment } = useInitPayment()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null)

  const handleSelectPayment = (methodId: number) => {
    setSelectedPaymentMethod(methodId)
  }

  const handlePlaceOrder = async () => {
    if (selectedPaymentMethod) {
      await initPayment(selectedPaymentMethod)
    }
  }

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [user, cartIsEmpty, router])

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex flex-col flex-1 gap-6">
        <UserDataSection />
        <ShipmentSection />
        <PaymentSection
          onSelectPaymentMethodAction={handleSelectPayment}
          selectedPaymentMethod={selectedPaymentMethod}
        />
      </div>
      <CartSummary onPlaceOrderAction={handlePlaceOrder} />
    </div>
  )
}
