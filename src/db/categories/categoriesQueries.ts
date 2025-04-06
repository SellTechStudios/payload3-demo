import configPromise from '@payload-config'
import { getPayload } from 'payload'

export type CategoryItem = {
  id: string
  name: string
}

const fetchById = async (id: string): Promise<CategoryItem> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.findByID({
    collection: 'product-category',
    id: id,
  })

  return result as unknown as CategoryItem
}

export const categoryQueries = { fetchById }
