'use server'

import { getPayload } from 'payload'
import { GetProductVector } from '@/services/ai'
import config from '@payload-config'

export async function submitData() {
  const payload = await getPayload({ config })
  const products = await payload.find({
    collection: 'products',
    depth: 0,
    limit: 1000,
  })

  for (const product of products.docs) {
    const embeddings = await GetProductVector(product)
    await payload.update({
      collection: 'products',
      id: product.id,
      data: {
        embedding: embeddings,
      },
    })
  }
}
