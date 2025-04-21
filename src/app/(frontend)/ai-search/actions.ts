'use server'

import { vectorQueries } from '@/db/products/vectorQueries'

export async function executeVectorSearch(query: string) {
  return await vectorQueries.productsSemanticSearch({ searchString: query })
}
