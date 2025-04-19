import { PipelineStage } from 'mongoose'
import { Product } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const fetchBySlug = async (slug: string): Promise<Product> => {
  const payload = await getPayload({ config: configPromise })
  const model = payload.db.collections['products']

  const result = await model.aggregate([{ $match: { slug: { $eq: slug } } } as PipelineStage])

  return result[0] as unknown as Product
}

export const detailsQueries = {
  fetchBySlug,
}
