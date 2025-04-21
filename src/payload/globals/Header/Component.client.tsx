/* eslint-disable @next/next/no-img-element */
'use client'

import { HeartIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'

import { CMSLink } from '@/components/Link'
import { CartLink } from '@/components/Cart/CartLink'
import { Container } from '@/components/Container'
import type { Header } from '@/payload-types'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'
import { cn } from '@/payload/utilities/cn'
import { useAuth } from '@/providers/Auth'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { usePathname } from 'next/navigation'

interface HeaderClientProps {
  data: Header
}

const mainNavItems = [
  { label: 'Wszystkie', path: '/products/all' },
  { label: 'Nowości', path: '/products/new' },
  { label: 'Bestsellery', path: '/products/bestseller' },
  { label: 'Blog', path: '/blog' },
  { label: 'Kontakt', path: '/contact' },
  { label: 'Wyszukaj AI', path: '/ai-search' },
]

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { user } = useAuth()
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const navItems = data?.navItems || []

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="py-4">
      <Container className="flex flex-row items-center justify-between">
        <Link prefetch={false} href="/">
          <img src="/logo.png" alt="Company Logo" width={200} height={100} />
        </Link>

        <form action={'/products/quicksearch'} className="relative max-w-[300px] w-full">
          <input
            type="text"
            name="searchString"
            placeholder="Search..."
            className="border w-full border-gray-300 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none"
          />
          <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <SearchIcon className="w-5 text-gray-500" />
          </button>
        </form>

        <div className="flex flex-row gap-6 uppercase text-sm">
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} appearance="default" />
          })}

          <CartLink />

          {user && (
            <Link href="/favourites" className="flex items-center gap-1">
              <HeartIcon className="size-5" />
              Ulubione ({user.favourites?.length})
            </Link>
          )}

          {user && (
            <Link prefetch={false} href="/account" className="flex items-center gap-1">
              <UserIcon className="size-5" />
              Moje konto
            </Link>
          )}

          {!user && (
            <Link prefetch={false} href="/login" className="flex items-center gap-1">
              Zaloguj
            </Link>
          )}
        </div>
      </Container>

      <div className="flex flex-row justify-center bg-gray-800 text-gray-100 mt-4 relative left-1/2 w-dvw max-w-none -translate-x-1/2">
        <nav className="flex flex-row justify-center items-center uppercase h-full">
          {mainNavItems.map((nav) => (
            <Link
              key={nav.path}
              href={nav.path}
              prefetch={false}
              className={cn(
                pathname === nav.path ? 'bg-gray-700' : '',
                'px-6 py-4 hover:bg-gray-700',
              )}
            >
              {nav.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
