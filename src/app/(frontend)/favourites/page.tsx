import { Container } from '@/components/Container'
import { FavoritesPageClient } from './page.client'
import React from 'react'

export const dynamic = 'force-dynamic'

export default async function Page() {
  return (
    <Container>
      <h2 className="col-span-full text-4xl mb-4">Ulubione Produkty</h2>

      <FavoritesPageClient />
    </Container>
  )
}
