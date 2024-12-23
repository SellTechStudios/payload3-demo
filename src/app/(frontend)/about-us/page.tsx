import { Container } from '@/components/Container'
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next/types'
import React from 'react'
import { Settings } from '@/payload-types'
import { getCachedGlobal } from '@/payload/utilities/getGlobals'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const settings: Settings = await getCachedGlobal('settings', 1)()

  return (
    <Container className="-mt-8">
      <img
        src="https://cdn.pixabay.com/photo/2014/02/13/07/31/department-store-265135_1280.jpg"
        alt="O Nas"
      />

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <article className="prose">
          <h4>Adres</h4>
          <div>{settings.addressLine1}</div>
          <div>{settings.addressLine2}</div>

          <h4>Telefon</h4>
          <a href={`tel:${settings.phone}`}>{settings.phone}</a>

          <h4>EMAIL</h4>
          <a href={`mailto:${settings.email}`}>{settings.email}</a>
        </article>

        <article>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </article>
      </div>
    </Container>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `O Nas`,
  }
}
