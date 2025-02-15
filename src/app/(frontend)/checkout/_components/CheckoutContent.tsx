// CheckoutContent.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CartSummary } from './CartSummary'
import { PaymentSection } from './PaymentSection'
import { ShipmentSection } from './ShipmentSection'
import { UserDataSection } from './UserDataSection'

export const CheckoutContent = () => {
  const router = useRouter()

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number | null>(null)
  const [paymentToken, setPaymentToken] = useState<string | null>(null)

  const onSelectPaymentMethodAction = (methodId: number) => {
    setSelectedPaymentMethod(methodId)
  }

  const onPlaceOrderAction = async () => {
    if (!selectedPaymentMethod) return

    const initPaymentResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/init-payment`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: selectedPaymentMethod }),
      },
    )
    const initPaymentResult = await initPaymentResponse.json()
    const token = initPaymentResult.data.token
    setPaymentToken(token)

    if (selectedPaymentMethod === 150) {
      await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/submit-blik`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          blikCode: '777123',
        }),
      })
    } else {
      router.push(`https://sandbox.przelewy24.pl/trnRequest/${token}`)
    }
  }

  return (
    <div className="flex flex-row gap-8">
      <div className="flex flex-1 flex-col gap-6">
        <div>
          <UserDataSection />
          <ShipmentSection />
        </div>

        <PaymentSection
          onSelectPaymentMethodAction={onSelectPaymentMethodAction}
          selectedPaymentMethod={selectedPaymentMethod}
        />
      </div>
      <CartSummary onPlaceOrderAction={onPlaceOrderAction} />
    </div>
  )
}
