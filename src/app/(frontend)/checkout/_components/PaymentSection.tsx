'use client'

import { P24PaymentMethod } from '@/app/_api/checkout.types'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type PaymentMethod = Omit<P24PaymentMethod, 'status'>

export const PaymentSection = () => {
  const router = useRouter()
  const [methods, setMethods] = useState<PaymentMethod[]>([])

  const onInitPayment = async (methodId: number) => {
    const initPaymentResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/init-payment`,
      {
        method: 'POST',
        body: JSON.stringify({ method: methodId }),
      },
    )

    const initPaymentResult = await initPaymentResponse.json()
    const token = initPaymentResult.data.token

    switch (methodId) {
      case 150: // BLIK
        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders/submit-blik`, {
          method: 'POST',
          body: JSON.stringify({
            token,
            blikCode: '777123',
          }),
        })
        break
      default:
        router.push(`https://sandbox.przelewy24.pl/trnRequest/${token}`)
        break
    }
  }
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment-methods/p24`)
      const methods = await response.json()
      setMethods(methods as PaymentMethod[])
    }

    fetchPaymentMethods()
  }, [])
  return (
    <section>
      <h4>Płatność</h4>
      <div className="flex flex-row flex-wrap">
        {methods.map((m) => (
          <Image
            key={m.id}
            className="cursor-pointer hover:bg-slate-300 flex flex-row gap-2 mb-2"
            src={m.imgUrl}
            width={50}
            height={50}
            alt={m.name}
            onClick={() => onInitPayment(m.id)}
          />
        ))}
      </div>
    </section>
  )
}
