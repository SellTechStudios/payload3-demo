'use server'

import config from '@payload-config'
import { getPayload } from 'payload'
import ollama from 'ollama'

export async function submitData() {
  const payload = await getPayload({ config })
  const products = await payload.find({
    collection: 'products',
    depth: 0,
    limit: 1000,
  })

  for (const product of products.docs) {
    const text = [product.title, product.description].filter(Boolean).join(' — ')
    const resp = await ollama.embed({
      model: 'nomic-embed-text',
      input: text,
    })

    const embeddings = resp.embeddings

    await payload.update({
      collection: 'products',
      id: product.id,
      data: {
        embedding: embeddings[0],
      },
    })
  }
}
