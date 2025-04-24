'use server'

import { Embed } from '@/services/ai'
import { vectorQueries } from '@/db/products/vectorQueries'

export async function executeVectorSearch(query: string) {
  const searchVector = await Embed(query, 'search_query')
  return await vectorQueries.productsSemanticSearch({ searchVector })
}
