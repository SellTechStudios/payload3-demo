import { PipelineStage } from 'mongoose'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type ProductSliderItem = {
  id: string
  name: string
  price: number
  pricePrevious: number
  ean: string
  imageUrl: string
  slug: string
}

const projectToSliderItem = {
  $project: {
    _id: 0,
    id: { $toString: '$_id' },
    name: 1,
    price: 1,
    pricePrevious: 1,
    ean: 1,
    imageUrl: {
      $let: {
        vars: {
          mainImage: {
            $first: {
              $filter: {
                input: '$mediaImages',
                as: 'image',
                cond: { $eq: ['$$image.isMain', true] },
              },
            },
          },
        },
        in: '$$mainImage.url',
      },
    },
    slug: 1,
  },
}

const fetchLatest = async (count: number): Promise<ProductSliderItem[]> => {
  const payload = await getPayload({ config: configPromise })
  const model = payload.db.collections['products']

  const result = await model.aggregate([
    { $sort: { createdAt: 1 } } as PipelineStage,
    { $limit: count } as PipelineStage,
    projectToSliderItem,
  ])

  return result as unknown as ProductSliderItem[]
}

const fetchBestsellers = async (count: number): Promise<ProductSliderItem[]> => {
  const payload = await getPayload({ config: configPromise })
  const model = payload.db.collections['products']

  const result = await model.aggregate([
    { $sort: { bestseller: 1 } } as PipelineStage,
    { $limit: count } as PipelineStage,
    projectToSliderItem,
  ])

  return result as unknown as ProductSliderItem[]
}

export const sliderQueries = {
  fetchBestsellers,
  fetchLatest,
}
