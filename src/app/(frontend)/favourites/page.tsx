/* eslint-disable @next/next/no-img-element */

import { Container } from '@/components/Container'
import { Product } from '@/payload-types'
import React from 'react'
import { formatCurrency } from '@/payload/utilities/formatPrice'
import { getMeUser } from '@/payload/utilities/getMeUser'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const { user } = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to see favourites products.',
    )}&redirect=${encodeURIComponent('/favourites')}`,
  })

  return (
    <Container>
      <h2 className="col-span-full text-4xl">Ulubione Produkty</h2>

      <div className="grid grid-cols-3 gap-8 container">
        {user.favourites
          ?.filter((p): p is Product => typeof p !== 'string')
          .map((p) => (
            <a
              key={p.id}
              className="flex flex-start py-8 hover:bg-gray-50 no-underline"
              href={`/product/${p.slug}`}
            >
              <img
                src={p.mediaImages?.find((i) => i.isMain)?.url ?? ''}
                alt={p.name ?? ''}
                className="h-16 w-16 rounded object-cover"
              />
              <div className="ml-4 flex flex-col gap-2 align-start">
                <div className="text-gray-800">{p.name}</div>
                <div className="text-sm text-red-500">{formatCurrency(p.price ?? 0)}</div>
              </div>
            </a>
          ))}
      </div>
    </Container>
  )
}
