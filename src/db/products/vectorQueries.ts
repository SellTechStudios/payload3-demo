import { ProductItem, VectorSearchRequest } from './queries.types'

import { PipelineStage } from 'mongoose'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import ollama from 'ollama'

const productsSemanticSearch = async (params: VectorSearchRequest) => {
  const payload = await getPayload({ config: configPromise })

  const resp = await ollama.embed({
    model: 'nomic-embed-text',
    input: params.searchString,
  })
  const queryEmbedding = resp.embeddings

  const pipeline: PipelineStage[] = [
    {
      $vectorSearch: {
        queryVector: queryEmbedding[0],
        path: 'embedding',
        numCandidates: 5,
        index: 'vector-index',
        limit: 5,
      },
    },
    {
      $project: {
        _id: 0,
        id: { $toString: '$_id' },
        bestseller: 1,
        title: 1,
        price: 1,
        pricePrevious: 1,
        mediaImages: 1,
        slug: 1,
        rating: 1,
        score: {
          $meta: 'vectorSearchScore',
        },
      },
    },
  ]

  const model = payload.db.collections['products']
  const aggregationResult = await model.aggregate(pipeline)

  console.log(aggregationResult)

  return aggregationResult as ProductItem[]
}

export const vectorQueries = {
  productsSemanticSearch,
}
