import './globals.css'

import { Poppins, Work_Sans } from 'next/font/google'

import { AdminBar } from '@/components/AdminBar'
import { Container } from '@/components/Container'
import { Footer } from '@/payload/globals/Footer/Component'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Header } from '@/payload/globals/Header/Component'
import { InitTheme } from '@/providers/Theme/InitTheme'
import type { Metadata } from 'next'
import { Providers } from '@/providers'
import React from 'react'
import { cn } from '@/payload/utilities/cn'
import { draftMode } from 'next/headers'
import { getServerSideURL } from '@/payload/utilities/getURL'
import { mergeOpenGraph } from '@/payload/utilities/mergeOpenGraph'

const poppins = Poppins({
  weight: ['300', '400', '600', '700'],
  subsets: ['latin'],
})

const work_sans = Work_Sans({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className={cn(work_sans.className)}>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <main className="main py-4">
            <Container>{children}</Container>
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
