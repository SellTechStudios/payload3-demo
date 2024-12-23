/* eslint-disable @next/next/no-img-element */

import type { Product, ProductsShowcaseBlock as ProductsShowcaseProps } from '@/payload-types'

import { GetMainImageUrl } from '@/payload/utilities/productUtils'
import Link from 'next/link'
import React from 'react'
import { cn } from '@/payload/utilities/cn'
import { formatCurrency } from '@/payload/utilities/formatPrice'

type Props = Omit<ProductsShowcaseProps, 'id' | 'blockType' | 'blockName'> & {
  className?: string
}

export const ProductsShowcaseBlock: React.FC<Props> = (props: Props) => {
  const { title, products } = props

  return (
    <div className={props.className}>
      <div className="prose">
        <h3>{title}</h3>
      </div>

      <div className="divide-y divide-gray-200">
        {Array.isArray(products) &&
          products
            .filter((p) => typeof p === 'object')
            .map((p: Product) => (
              <Link
                prefetch={false}
                key={p.id}
                className="flex flex-start py-8 hover:bg-gray-50 no-underline"
                href={`/product/${p.slug}`}
              >
                <img
                  src={GetMainImageUrl(p)}
                  alt={p.name ?? ''}
                  className="h-16 w-16 rounded object-cover"
                />
                <div className="ml-4 flex flex-col gap-2 align-start">
                  <div className="text-gray-800">{p.name}</div>
                  <div className="text-sm text-red-500">{formatCurrency(p.price ?? 0)}</div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}
