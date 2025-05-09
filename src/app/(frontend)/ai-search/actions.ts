'use server'

import { vectorQueries } from '@/db/products/vectorQueries'
import { GetSearchQueryVector } from '@/services/ai'

export async function executeVectorSearch(query: string) {
  const searchVector = await GetSearchQueryVector(query)
  return await vectorQueries.productsSemanticSearch({ searchVector })
}
