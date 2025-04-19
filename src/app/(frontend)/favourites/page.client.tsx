'use client'

import { Product } from '@/payload-types'
import { ProductCard } from '@/components/Product/Card/ProductCard'
import React from 'react'
import { useAuth } from '@/providers/Auth'

export const FavoritesPageClient: React.FC = () => {
  const { user } = useAuth()

  return (
    <div className="gap-8 grid grid-cols-3 container">
      {user?.favourites
        ?.filter((p): p is Product => typeof p !== 'string')
        .map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  )
}
