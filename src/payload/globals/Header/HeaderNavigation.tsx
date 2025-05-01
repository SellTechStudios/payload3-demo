import { Container } from '@/components/Container'
import { cn } from '@/payload/utilities/cn'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

const HeaderNavigation = () => {
  const pathname = usePathname()
  const t = useTranslations('Header')

  const mainNavItems = [
    { label: t('products'), path: '/products/all' },
    // { label: t('new'), path: '/products/new' },
    // { label: t('bestsellers'), path: '/products/bestseller' },
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
    <div className="relative flex items-center bg-gray-800 text-gray-100 ">
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
  )
}

export default HeaderNavigation
