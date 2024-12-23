'use client'

import React, { useEffect, useState } from 'react'

import CartItemsList from '@/components/Cart/CartItemsList'
import Image from 'next/image'
import { InpostGeowidget } from './components/InPostGeoWidget'
import { P24PaymentMethod } from '@/app/_api/checkout.types'
import { ShoppingCart } from 'lucide-react'
import { useRouter } from 'next/navigation'

type PaymentMethod = Omit<P24PaymentMethod, 'status'>

export const CheckoutPage: React.FC = () => {
  const router = useRouter()

  const [methods, setMethods] = useState<PaymentMethod[]>([])

  const onInitPayment = async (methodId: number) => {
    const initPaymentResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/init-payment`,
      {
        method: 'POST',
        body: JSON.stringify({
          method: methodId,
        }),
      },
    )
    const initPaymentResult = await initPaymentResponse.json()
    const token = initPaymentResult.data.token

    switch (methodId) {
      case 150: //BLIK
        const submitBlikResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/submit-blik`,
          {
            method: 'POST',
            body: JSON.stringify({
              token: token,
              blikCode: '777123',
            }),
          },
        )
        const submitBlikResult = await submitBlikResponse.json()
        console.log(submitBlikResult)
        break
      default:
        router.push(`https://sandbox.przelewy24.pl/trnRequest/${token}`)
        break
    }
  }

  const onShipmentLocationSelected = (e: Location) => {
    console.log(e)
  }

  useEffect(() => {
    const fetchPaymnetMethodsEffect = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment-methods/p24`)
      const methods = await response.json()

      setMethods(methods as PaymentMethod[])
    }

    fetchPaymnetMethodsEffect()
  }, [])

  return (
    <div className="flex flex-row gap-8">
      <div className="flex flex-1 flex-col gap-20">
        {/* SHIPMENT */}
        <section style={{ height: '400px' }}>
          <h4>Dostawa</h4>
          <InpostGeowidget onPoint={onShipmentLocationSelected} />
        </section>

        {/* PAYMENT */}
        <section>
          <h4>Płatność</h4>
          <div className="flex flex-row flex-wrap">
            {methods.map((m) => {
              return (
                <Image
                  key={m.id}
                  className="cursor-pointer hover:bg-slate-300 flex flex-row gap-2 mb-2"
                  src={m.imgUrl}
                  width={50}
                  height={50}
                  alt={m.name}
                  onClick={() => onInitPayment(m.id)}
                />
              )
            })}
          </div>
        </section>
      </div>

      {/* CART SUMMARY */}
      <aside className="basis-1/4 p-4 bg-gray-200 rounded-tr-lg rounded-bl-lg ">
        <header className="flex flex-row gap-2 items-center">
          <ShoppingCart className="size-6" />
          <h4>Koszyk</h4>
        </header>

        <CartItemsList />
      </aside>
    </div>
  )
}
