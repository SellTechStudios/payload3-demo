/* eslint-disable @next/next/no-img-element */
'use client'

import { HeartIcon, UserIcon } from '@heroicons/react/24/outline'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'

import { CartLink } from '@/components/Cart/CartLink'
import { Container } from '@/components/Container'
import { CMSLink } from '@/components/Link'
import LocaleSwitcher from '@/components/LocaleSwicher'
import type { Header } from '@/payload-types'
import { cn } from '@/payload/utilities/cn'
import { useAuth } from '@/providers/Auth'
import { SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { user } = useAuth()
  const pathname = usePathname()
  const navItems = data?.navItems || []
  const t = useTranslations('Header')

  const mainNavItems = [
    { label: t('all'), path: '/products/all' },
    { label: t('new'), path: '/products/new' },
    { label: t('bestsellers'), path: '/products/bestseller' },
    { label: t('blog'), path: '/blog' },
    { label: t('contact'), path: '/contact' },
    { label: t('aiSearch'), path: '/ai-search' },
  ]

  const [showLeftButton, setShowLeftButton] = useState(false)
  const [showRightButton, setShowRightButton] = useState(false)
  const navContentRef = useRef<HTMLDivElement>(null)

  const updateScrollButtons = useCallback(() => {
    if (navContentRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navContentRef.current
      setShowLeftButton(scrollLeft > 0)
      setShowRightButton(scrollLeft < scrollWidth - clientWidth)
    }
  }, [])

  const scrollLeft = () => {
    navContentRef.current?.scrollBy({ left: -200, behavior: 'smooth' })
  }

  const scrollRight = () => {
    navContentRef.current?.scrollBy({ left: 200, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('resize', updateScrollButtons)
    navContentRef.current?.addEventListener('scroll', updateScrollButtons)
    updateScrollButtons()

    return () => {
      window.removeEventListener('resize', updateScrollButtons)
      navContentRef.current?.removeEventListener('scroll', updateScrollButtons)
    }
  }, [updateScrollButtons])

  return (
    <header className="py-4">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Link prefetch={false} href="/">
          <img src="/logo.png" alt="Company Logo" className="w-32 md:w-48" />
        </Link>

        <form
          action={'/products/quicksearch'}
          className="relative w-full max-w-[300px] hidden md:block"
        >
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

        <div className="flex flex-row gap-4 md:gap-6 uppercase text-sm items-center">
          <LocaleSwitcher />

          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} appearance="default" />
          })}

          <CartLink />

          {user && (
            <Link href="/favourites" className="flex items-center gap-1">
              <HeartIcon className="size-5" />
              <span className="hidden md:inline">Ulubione ({user.favourites?.length})</span>
            </Link>
          )}

          {user && (
            <Link prefetch={false} href="/account" className="flex items-center gap-1">
              <UserIcon className="size-5" />
              <span className="hidden md:inline">{t('account')}</span>
            </Link>
          )}

          {!user && (
            <Link prefetch={false} href="/login" className="flex items-center gap-1">
              <span className="hidden md:inline">{t('login')}</span>
            </Link>
          )}
        </div>
      </Container>

      <div className="relative flex items-center bg-gray-800 text-gray-100 mt-4">
        {showLeftButton && (
          <button
            className="absolute left-0 top-0 z-10 p-2 bg-gray-700 text-white hover:bg-gray-600"
            onClick={scrollLeft}
          >
            ‹
          </button>
        )}
        <Container
          className="flex overflow-x-auto scrollbar-hide w-full md:justify-center"
          ref={navContentRef}
        >
          {mainNavItems.map((nav) => (
            <Link
              key={nav.path}
              href={nav.path}
              prefetch={false}
              className={cn(
                pathname === nav.path ? 'bg-gray-700' : '',
                'px-4 py-2 md:px-6 md:py-4 hover:bg-gray-700 text-center block whitespace-nowrap',
              )}
            >
              {nav.label}
            </Link>
          ))}
        </Container>
        {showRightButton && (
          <button
            className="absolute top-0 right-0 z-10 p-2 bg-gray-700 text-white hover:bg-gray-600"
            onClick={scrollRight}
          >
            ›
          </button>
        )}
      </div>
    </header>
  )
}
