'use client'

import React, { useEffect, useState } from 'react'

import { useCart } from '@/providers/Cart'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export const CartLink: React.FC = () => {
  const { cart } = useCart()
  const [length, setLength] = useState<number>()

  useEffect(() => {
    setLength(cart?.items?.length || 0)
  }, [cart])

  return (
    <Link prefetch={false} href="/cart" className="flex items-center gap-1">
      <div className="relative">
        <ShoppingCart className="size-5" />

        <span className="absolute -top-3 left-2 rounded-full bg-red-500 p-0.5 px-2 text-sm scale-75 text-red-50">
          {length}
        </span>
      </div>
    </Link>
  )
}
