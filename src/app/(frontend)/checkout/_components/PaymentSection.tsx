'use client'

import { P24PaymentMethod } from '@/app/_api/checkout.types'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type PaymentMethod = Omit<P24PaymentMethod, 'status'>

type PaymentSectionProps = {
  onSelectPaymentMethodAction: (methodId: number) => void
  selectedPaymentMethod: number | null
}

export const PaymentSection: React.FC<PaymentSectionProps> = ({
  onSelectPaymentMethodAction,
  selectedPaymentMethod,
}) => {
  const [methods, setMethods] = useState<PaymentMethod[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/payment-methods/p24`,
        )
        const data = await response.json()
        setMethods(data as PaymentMethod[])
      } catch (error) {
        console.error('Error fetching payment methods:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMethods()
  }, [])

  return (
    <section className="py-8 bg-gray-100 px-6 rounded-lg shadow-sm">
      <h4 className="text-xl font-bold mb-4">Metoda płatności</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => <PaymentMethodSkeleton key={i} />)
          : methods.map((m) => (
              <div
                key={m.id}
                onClick={() => onSelectPaymentMethodAction(m.id)}
                className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 flex flex-col items-center text-center ${
                  selectedPaymentMethod === m.id
                    ? 'bg-white border-blue-500 shadow-lg'
                    : 'bg-white hover:shadow-md'
                }`}
              >
                <Image src={m.imgUrl} width={64} height={64} alt={m.name} />
                <p className="mt-2 text-sm font-medium">{m.name}</p>
              </div>
            ))}
      </div>
    </section>
  )
}

const PaymentMethodSkeleton = () => (
  <div className="animate-pulse p-4 rounded-lg border bg-white flex flex-col items-center">
    <div className="w-16 h-16 bg-gray-300 rounded mb-2" />
    <div className="h-4 w-3/4 bg-gray-200 rounded" />
  </div>
)
