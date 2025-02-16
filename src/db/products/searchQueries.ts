import { byNameSort, newProductsSort } from './queryAggregates/sort'
import { inCategoryMatch, specialOffersMatch } from './queryAggregates/match'

import { PipelineStage } from 'mongoose'
import { ProductsListProps } from '@/app/(frontend)/products/_components/product-list/Component'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { quickSearch } from './queryAggregates/search'
import stages from './pipelineStates'

export type ProductItem = {
  id: string
  isPromoted: boolean
  name: string
  price: number
  pricePrevious: number
  ean: string
  mediaImages: MediaImage[]
  slug: string
  manufacturer: string
}

const fetchProducts = async (params: ProductsListProps) => {
  const payload = await getPayload({ config: configPromise })
  const model = payload.db.collections['products']

  let match = {}
  let search = {}
  let sort = {}

  switch (params.listType) {
    case 'category':
      match = inCategoryMatch(params.categoryId)
      break
    case 'specialOffer':
      match = specialOffersMatch()
      break
    case 'new':
      sort = newProductsSort()
      break
    case 'quicksearch':
      search = quickSearch(params.searchString)
      break
    case 'all':
      sort = byNameSort()
      break
  }

  // // Build the match object for filters
  // let matchQuery = {}

  const aggregate = productAggregate(match)

  const result = await model.aggregate(aggregate)
  return result as unknown as ProductItem[]
}

const productAggregate = (matchQuery): PipelineStage[] => [
  //apply input query
  { $match: matchQuery },

  ...stages.join.joinWithManufacturers,

  //narrow down product fields
  stages.project.toProductSearchItem,
]

export const productQueries = {
  fetchProducts,
}
