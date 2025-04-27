'use client'

import React from 'react'
import 'swiper/css'
import 'swiper/css/navigation'

import type { Header } from '@/payload-types'
import HeaderActions from './HeaderActions'
import HeaderNavigation from './HeaderNavigation'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <header>
      <HeaderActions navItems={navItems} />
      <HeaderNavigation />
    </header>
  )
}
