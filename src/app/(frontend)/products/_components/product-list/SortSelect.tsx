'use client'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export const SortSelect = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || 'newest'
  const t = useTranslations('ProductList')
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', e.target.value)
    params.set('page', '1') // reset page on sort change
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div>
      <label className="mr-2 font-semibold">{t('Sort')}:</label>
      <select value={currentSort} onChange={handleChange} className="border p-2 rounded">
        <option value="newest">{t('Newest')}</option>
        <option value="bestseller">{t('Bestsellers')}</option>
        <option value="price-asc">{t('PriceAscending')}</option>
        <option value="price-desc">{t('PriceDescending')}</option>
      </select>
    </div>
  )
}
