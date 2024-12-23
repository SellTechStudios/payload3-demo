import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type CategoryItem = {
  id: string
  name: string
}

const fetchAllCategories = async (): Promise<CategoryItem[]> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'product-category',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      name: true,
    },
  })

  return result.docs as unknown as CategoryItem[]
}

const fetchById = async (id: string): Promise<CategoryItem> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.findByID({
    collection: 'product-category',
    id: id,
  })

  return result as unknown as CategoryItem
}

export const categoryQueries = { fetchAllCategories, fetchById }
