'use client'

import { P24PaymentMethod } from '@/app/_api/checkout.types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type PaymentMethod = Omit<P24PaymentMethod, 'status'>

interface PaymentSectionProps {
  onSelectPaymentMethodAction: (methodId: number) => void
  selectedPaymentMethod: number | null
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  onSelectPaymentMethodAction,
  selectedPaymentMethod,
}) => {
  const [methods, setMethods] = useState<PaymentMethod[]>([])

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment-methods/p24`)
      const methods = await response.json()
      setMethods(methods as PaymentMethod[])
    }

    fetchPaymentMethods()
  }, [])

  return (
    <section className="py-8">
      <h4 className="text-2xl font-bold mb-6">Płatność</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {methods.map((m) => (
          <div
            key={m.id}
            onClick={() => onSelectPaymentMethodAction(m.id)}
            className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 
              ${
                selectedPaymentMethod === m.id
                  ? 'bg-gray-200 border-transparent shadow-lg'
                  : 'bg-white hover:shadow-md'
              }`}
          >
            <div className="flex justify-center items-center h-16">
              <Image src={m.imgUrl} width={64} height={64} alt={m.name} />
            </div>
            <p className="text-center mt-3 text-sm font-medium">{m.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
