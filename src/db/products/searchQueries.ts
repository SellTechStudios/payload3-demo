import { inCategoryMatch, specialOffersMatch } from './queryAggregates/match'

import { PipelineStage } from 'mongoose'
import { ProductsListProps } from '@/app/(frontend)/products/_components/product-list/Component'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { newProductsSort } from './queryAggregates/sort'
import { quickSearch } from './queryAggregates/search'
import stages from './pipelineStates'

const PRICE_BOUNDS = [0, 50, 100, 150, 200, 500]
const PAGE_SIZE = 5

export type PriceRange = {
  id: string
  lowerBound: number
  upperBound: number
}

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
    case 'incategory':
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
  }

  // // Build the match object for filters
  // let matchQuery = {}

  // //apply value filters
  // for (const [key, value] of Object.entries(filters?.filterChecks) as [string, string[]][]) {
  //   value?.forEach((v) => {
  //     matchQuery[key] = { $eq: ObjectID(v) }
  //   })
  // }

  // //apply range filters match
  // for (const [key, value] of Object.entries(filters?.filterRanges) as [string, PriceRange[]][]) {
  //   value?.forEach((v) => {
  //     matchQuery[key] = { $gte: v.lowerBound, $lte: v.upperBound }
  //   })
  // }

  // //apply filters dependent on the list type that we get in request body
  // matchQuery = Object.assign(matchQuery, filters?.match)

  // const aggregate = productAggregate(matchQuery)
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

  //apply facets
  // {
  //   $facet: {
  //     ...stages.buckets.documentsBucket(PAGE_SIZE),
  //     ...stages.buckets.priceBucket(PRICE_BOUNDS),
  //     Manufacturer: [
  //       {
  //         $group: {
  //           _id: {
  //             id: '$manufacturerId',
  //             name: '$manufacturer',
  //           },
  //           count: { $sum: 1 },
  //         },
  //       },
  //       {
  //         $sort: { count: -1, '_id.name': 1 },
  //       },
  //       {
  //         $project: {
  //           _id: 0,
  //           id: '$_id.id',
  //           name: '$_id.name',
  //           count: 1,
  //         },
  //       },
  //     ],
  //     Promoted: [
  //       {
  //         $group: {
  //           _id: {
  //             id: '$isPromoted',
  //             name: {
  //               $cond: [{ $eq: ['$isPromoted', true] }, 'Promocja', 'Cena regularna'],
  //             },
  //           },
  //           count: { $sum: 1 },
  //         },
  //       },
  //       {
  //         $sort: { count: -1 },
  //       },
  //       {
  //         $project: {
  //           _id: 0,
  //           name: '$_id.name',
  //           count: 1,
  //         },
  //       },
  //     ],
  //   },
  // },
]

export const productQueries = {
  fetchProducts,
}
