'use client'

import { CategoryItem } from '@/db/categories/categoriesQueries'
import Link from 'next/link'
import { cn } from '@/payload/utilities/cn'
import { usePathname } from 'next/navigation'

type Props = {
  categories: CategoryItem[]
}

export const CategoryNavigationClient: React.FC<Props> = (props) => {
  const { categories } = props
  const path = usePathname()

  return (
    <>
      {categories?.map((c) => {
        const href = `/products/category/${c.id}`
        const isActive = path === href

        return (
          <Link
            key={c.id}
            href={`/products/category?categoryId=${c.id}`}
            className={cn('p-2 block hover:bg-slate-200', isActive ? 'bg-slate-100' : '')}
          >
            {c.name}
          </Link>
        )
      })}
    </>
  )
}
