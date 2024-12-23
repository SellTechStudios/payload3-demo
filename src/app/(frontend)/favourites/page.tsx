import { Container } from '@/components/Container'
/* eslint-disable @next/next/no-img-element */
import React from 'react'
import configPromise from '@payload-config'
import { formatCurrency } from '@/payload/utilities/formatPrice'
import { getMeUser } from '@/payload/utilities/getMeUser'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const user = await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to access your favourite products list.',
    )}&redirect=${encodeURIComponent('/favourites')}`,
  })

  const products = await payload.find({
    collection: 'products',
    depth: 1,
    overrideAccess: false,
    where: {
      id: {
        in: user.user.favourites ?? [],
      },
    },
    select: {
      name: true,
      slug: true,
      mediaImages: true,
      price: true,
    },
  })

  return (
    <Container>
      <div className="grid grid-cols-3 gap-8 container">
        {products.docs.map((p) => (
          <a
            key={p.id}
            className="flex flex-start py-8 hover:bg-gray-50 no-underline"
            href={`/products/${p.slug}`}
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
