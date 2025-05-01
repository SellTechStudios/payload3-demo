'use client'

import * as Select from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { Check, ChevronDown } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const SortSelect = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || 'newest'
  const t = useTranslations('ProductList')

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="relative">
      <Select.Root defaultValue={currentSort} onValueChange={handleChange}>
        <Select.Trigger className="flex items-center justify-between border border-gray-300 rounded px-4 py-2 w-full bg-white text-sm">
          <Select.Value placeholder={t('Sort')} />
          <Select.Icon>
            <ChevronDown className="w-4 h-4 text-gray-500 ml-2" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="bg-white border border-gray-200 rounded shadow-lg z-50"
            position="popper"
          >
            <Select.Viewport className="p-1">
              {[
                { value: 'newest', label: t('Newest') },
                { value: 'bestseller', label: t('Bestsellers') },
                { value: 'price-asc', label: t('PriceAscending') },
                { value: 'price-desc', label: t('PriceDescending') },
              ].map((opt) => (
                <Select.Item
                  key={opt.value}
                  value={opt.value}
                  className={clsx(
                    'flex items-center justify-between px-3 py-2 text-sm rounded cursor-pointer',
                    'focus:bg-gray-100 focus:outline-none data-[state=checked]:font-semibold',
                  )}
                >
                  <Select.ItemText>{opt.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Check className="w-4 h-4 text-primary ml-2" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}
