import './globals.css'

import { AdminBar } from '@/components/AdminBar'
import { Container } from '@/components/Container'
import { Footer } from '@/payload/globals/Footer/Component'
import { Header } from '@/payload/globals/Header/Component'
import { cn } from '@/payload/utilities/cn'
import { getServerSideURL } from '@/payload/utilities/getURL'
import { mergeOpenGraph } from '@/payload/utilities/mergeOpenGraph'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { draftMode } from 'next/headers'
import React from 'react'

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
          <main className="py-4 main">
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
