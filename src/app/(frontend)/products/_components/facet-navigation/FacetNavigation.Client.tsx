'use client'

import { FacetedNavigation } from '@/db/products/queries.types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@payloadcms/ui'
import { useTranslations } from 'next-intl'
import FacetBucketClient from './FacetBucketClient'

type Props = {
  facets: FacetedNavigation
}

export const FacetNavigationClient: React.FC<Props> = (props) => {
  const { facets } = props
  const selectedValues = new Map<string, string[]>()
  const t = useTranslations('ProductList')

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  searchParams.forEach((value, key) => {
    const current = selectedValues.get(key) || []
    selectedValues.set(key, [...current, value])
  })
  function handleOptionClick(
    bucket: string,
    option?: { bucketCode?: string; optionValue: string | number | boolean; isChecked: boolean },
  ): void {
    const current = new URLSearchParams(searchParams.toString())

    if (option?.isChecked) {
      current.append(bucket, String(option.optionValue))
    } else {
      const all = current.getAll(bucket).filter((v) => v !== String(option?.optionValue))
      current.delete(bucket)
      all.forEach((v) => current.append(bucket, v))
    }

    current.set('page', '1')

    router.push(`${pathname}?${current.toString()}`)
  }

  return (
    <nav className="prose">
      <FacetBucketClient
        bucket={{ ...facets.category, label: t('Category') }}
        selectedValues={selectedValues.get('category') || []}
        onOptionClick={(option) => handleOptionClick('category', option)}
      />
      <FacetBucketClient
        bucket={{ ...facets.price, label: t('Price') }}
        selectedValues={selectedValues.get('price') || []}
        onOptionClick={(option) => handleOptionClick('price', option)}
      />
      <FacetBucketClient
        bucket={{ ...facets.manufacturer, label: t('Manufacturer') }}
        selectedValues={selectedValues.get('manufacturer') || []}
        onOptionClick={(option) => handleOptionClick('manufacturer', option)}
      />
      <Button buttonStyle="secondary" onClick={() => router.push(pathname)}>
        Wyczyść wszystkie filtry
      </Button>
    </nav>
  )
}
