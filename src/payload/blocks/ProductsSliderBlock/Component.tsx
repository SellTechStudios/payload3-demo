import { getTranslations } from 'next-intl/server'
import React, { Suspense } from 'react'

import { Container } from '@/components/Container'
import { productQueries } from '@/db'
import { ProductSearchResponse } from '@/db/products/queries.types'
import { Page } from 'src/payload-types'
import { ProductsSliderClient } from './Component.Client'
import { ProductsSliderSkeleton } from './Component.Loading'

type Props = Extract<Page['layout'][0], { blockType: 'productsSlider' }>

export const ProductsSliderBlock: React.FC<Props> = async (props) => {
  const { ProductsCount, ListType, Description } = props
  const t = await getTranslations('ProductsSliderBlock')

  const getHeader = () => {
    switch (ListType) {
      case 'Bestsellers':
        return t('bestsellers')
      case 'Recent':
        return t('recent')
    }
  }

  const ProductsSliderServerWrapper = async ({ count, listType }) => {
    let response: ProductSearchResponse

    switch (listType) {
      case 'Bestsellers':
        response = await productQueries.fetchProducts({
          type: 'bestseller',
          pageSize: count,
          page: 1,
        })
        break
      case 'Recent':
        response = await productQueries.fetchProducts({
          type: 'new',
          pageSize: count,
          page: 1,
        })
        break

      default:
        throw new Error('Invalid list type')
    }

    return <ProductsSliderClient products={response.products} />
  }

  return (
    <Container>
      <div className="mb-16 max-w-full text-center prose">
        <h1>{getHeader()}</h1>
        {Description && <p className="text-gray-400 text-small tracking-wide">{Description}</p>}
      </div>

      <Suspense fallback={<ProductsSliderSkeleton />}>
        <ProductsSliderServerWrapper count={ProductsCount} listType={ListType} />
      </Suspense>
    </Container>
  )
}
