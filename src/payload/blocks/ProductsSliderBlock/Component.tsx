import React, { Suspense } from 'react'

import { Container } from '@/components/Container'
import { Page } from 'src/payload-types'
import { ProductSliderItem } from '@/db/products/sliderQueries'
import { ProductsSliderClient } from './Component.Client'
import { ProductsSliderSkeleton } from './Component.Loading'
import { sliderQueries } from '@/db'

type Props = Extract<Page['layout'][0], { blockType: 'productsSlider' }>

export const ProductsSliderBlock: React.FC<Props> = async (props) => {
  const { ProductsCount, ListType, Description } = props

  const getHeader = () => {
    switch (ListType) {
      case 'Bestsellers':
        return 'Bestsellers'
      case 'Recent':
        return 'Niedawno dodane'
    }
  }

  const ProductsSliderServerWrapper = async ({ count, listType }) => {
    await new Promise((res) => setTimeout(res, 1000))
    let products: ProductSliderItem[] | undefined

    switch (listType) {
      case 'Bestsellers':
        products = await sliderQueries.fetchBestsellers(count)
      case 'Recent':
        products = await sliderQueries.fetchLatest(count)
    }

    return <ProductsSliderClient products={products} />
  }

  return (
    <Container>
      <div className="prose text-center mb-16 max-w-full">
        <h1>{getHeader()}</h1>
        {Description && <p className="text-small text-gray-400 tracking-wide">{Description}</p>}
      </div>

      <Suspense fallback={<ProductsSliderSkeleton />}>
        <ProductsSliderServerWrapper count={ProductsCount} listType={ListType} />
      </Suspense>
    </Container>
  )
}
