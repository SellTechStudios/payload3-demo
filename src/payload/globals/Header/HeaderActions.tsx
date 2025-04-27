import { CartLink } from '@/components/Cart/CartLink'
import { Container } from '@/components/Container'
import { CMSLink, CMSLinkType } from '@/components/Link'
import LocaleSwitcher from '@/components/LocaleSwicher'
import { useAuth } from '@/providers/Auth'
import { HeartIcon, UserIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HeaderSearch } from './HeaderSearch'
interface UserActionsProps {
  navItems: { link: CMSLinkType }[]
}

const HeaderActions: React.FC<UserActionsProps> = ({ navItems }) => {
  const { user } = useAuth()
  const t = useTranslations('Header')

  return (
    <Container className="flex items-center justify-between gap-4 py-4">
      <Link prefetch={false} href="/" className="relative w-32 md:w-48 h-12">
        <Image
          src="/logo.png"
          alt="Company Logo"
          fill
          priority
          className="object-contain"
          sizes="(max-width: 768px) 8rem, 12rem"
        />
      </Link>

      <HeaderSearch />

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
  )
}

export default HeaderActions
