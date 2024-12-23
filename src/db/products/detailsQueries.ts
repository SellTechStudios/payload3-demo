import { PipelineStage } from 'mongoose'
import { Product } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type ProductDetails = {
  id: string
  title: string
  price?: number | null
  pricePrevious?: number | null
  vat?: number | null
  weight?: number | null
  quantity?: number | null
  quantityMin?: number | null
  quantityStep?: number | null
  name?: string | null
  code?: string | null
  ean?: string | null
  description?: string | null
  keywords?: string | null
  bestseller?: boolean | null
  specialOffer?: boolean | null
  mediaVideo?:
    | {
        url?: string | null
        id?: string | null
      }[]
    | null
  mediaImages?:
    | {
        url: string
        isMain: boolean
        id?: string | null
      }[]
    | null
  seoTitle?: string | null
  seoDescription?: string | null
  seoImageUrl?: string | null
  slug?: string | null
}

const projectToDetails = {
  $project: {
    _id: 0,
    id: { $toString: '$_id' },
    title: 1,
    price: 1,
    pricePrevious: 1,
    vat: 1,
    weight: 1,
    quantity: 1,
    quantityMin: 1,
    quantityStep: 1,
    name: 1,
    code: 1,
    ean: 1,
    description: 1,
    keywords: 1,
    bestseller: 1,
    specialOffer: 1,
    mediaVideo: 1,
    mediaImages: 1,
    seoTitle: 1,
    seoDescription: 1,
    seoImageUrl: 1,
    slug: 1,
  },
}

const fetchAll = async (): Promise<Product[]> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.db.collections['products'].find({})

  return result as unknown as Product[]
}

const fetchBySlug = async (slug: string): Promise<ProductDetails> => {
  const payload = await getPayload({ config: configPromise })
  const model = payload.db.collections['products']

  const result = await model.aggregate([
    { $match: { slug: { $eq: slug } } } as PipelineStage,
    projectToDetails,
  ])

  return result[0] as unknown as ProductDetails
}

export const detailsQueries = {
  fetchAll,
  fetchBySlug,
}
