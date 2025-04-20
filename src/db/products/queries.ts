import { FacetedNavigation, ProductItem, SearchRequest } from './queries.types'

import { PipelineStage } from 'mongoose'
import { ProjectToProductItem } from './queries.projections'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

const buildProductsQueryPipeline = (params: SearchRequest) => {
  const { searchString } = params

  const aggregationPipeline: PipelineStage[] = []

  switch (params.type) {
    case 'all':
      aggregationPipeline.push({ $sort: { title: 1 } })
      break
    case 'new':
      aggregationPipeline.push({ $sort: { createdAt: 1 } })
      break
    case 'bestseller':
      aggregationPipeline.push({ $match: { bestseller: true } })
      aggregationPipeline.push({ $sort: { title: 1 } })
      break
    case 'quicksearch':
      if (searchString) {
        aggregationPipeline.push({
          $match: {
            $or: [
              { title: { $regex: searchString, $options: 'i' } },
              { name: { $regex: searchString, $options: 'i' } },
              { description: { $regex: searchString, $options: 'i' } },
            ],
          },
        })
      }
      aggregationPipeline.push({ $sort: { title: 1 } })
      break
  }

  return aggregationPipeline
}

const fetchAllSlugs = async (): Promise<string[]> => {
  const payload = await getPayload({ config: configPromise })
  const productsResponse = await payload.find({
    collection: 'products',
    limit: 0, // Fetch all documents
    select: {
      slug: true,
    },
  })

  return productsResponse.docs.map((doc) => doc.slug || '')
}

const fetchProducts = async (params: SearchRequest) => {
  const payload = await getPayload({ config: configPromise })
  const pipeline = buildProductsQueryPipeline(params)

  pipeline.push({ $limit: params.count || 9 })
  pipeline.push(ProjectToProductItem)

  const model = payload.db.collections['products']
  const aggregationResult = await model.aggregate(pipeline)

  return aggregationResult as ProductItem[]
}

const fetchFacets = async (params: SearchRequest): Promise<FacetedNavigation> => {
  const payload = await getPayload({ config: configPromise })

  const pipeline: PipelineStage[] = [
    // lookup for categories
    {
      $lookup: {
        from: 'product-categories',
        localField: 'Category',
        foreignField: '_id',
        as: 'categoryDetails',
      },
    },
    {
      $unwind: {
        path: '$categoryDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    // lookup for manufacturers
    {
      $lookup: {
        from: 'manufacturers',
        localField: 'manufacturer',
        foreignField: '_id',
        as: 'manufacturerDetails',
      },
    },
    {
      $unwind: {
        path: '$manufacturerDetails',
        preserveNullAndEmptyArrays: true,
      },
    },
    ...buildProductsQueryPipeline(params),
    {
      $project: {
        categoryId: '$categoryDetails._id',
        categoryName: '$categoryDetails.name',
        manufacturerId: '$manufacturerDetails._id',
        manufacturerName: '$manufacturerDetails.name',
        bestseller: 1,
        price: 1,
      },
    },
    {
      $facet: {
        // Manufacturer facets
        manufacturerFacets: [
          {
            $match: { manufacturerId: { $ne: null } },
          },
          {
            $group: {
              _id: '$manufacturerId',
              name: { $first: '$manufacturerName' },
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1, name: 1 } },
          { $project: { _id: 0, label: '$name', count: 1, value: { $toString: '$_id' } } },
        ],

        // Category facets
        categoryFacets: [
          {
            $match: { categoryId: { $ne: null } },
          },
          {
            $group: {
              _id: '$categoryId',
              name: { $first: '$categoryName' },
              count: { $sum: 1 },
            },
          },
          { $sort: { count: -1, name: 1 } },
          { $project: { _id: 0, label: '$name', count: 1, value: { $toString: '$_id' } } },
        ],

        // Price facets
        priceFacets: [
          {
            $bucket: {
              groupBy: '$price',
              boundaries: [0, 50, 100, 200, 300, 500],
              default: '500+',
              output: { count: { $sum: 1 } },
            },
          },
          {
            $project: {
              _id: 0,
              label: {
                $switch: {
                  branches: [
                    { case: { $eq: ['$_id', 0] }, then: '0-50' },
                    { case: { $eq: ['$_id', 50] }, then: '50-100' },
                    { case: { $eq: ['$_id', 100] }, then: '100-200' },
                    { case: { $eq: ['$_id', 200] }, then: '200-300' },
                    { case: { $eq: ['$_id', 300] }, then: '300-500' },
                  ],
                  default: '500+',
                },
              },
              count: 1,
              value: {
                $switch: {
                  branches: [
                    { case: { $eq: ['$_id', 0] }, then: '0-50' },
                    { case: { $eq: ['$_id', 50] }, then: '50-100' },
                    { case: { $eq: ['$_id', 100] }, then: '100-200' },
                    { case: { $eq: ['$_id', 200] }, then: '200-300' },
                    { case: { $eq: ['$_id', 300] }, then: '300-500' },
                  ],
                  default: '500+',
                },
              },
            },
          },
        ],
      },
    },
  ]

  console.dir(pipeline, { depth: null })
  // Execute the aggregation pipeline directly on MongoDB
  const model = payload.db.collections['products']
  const aggregationResult = await model.aggregate(pipeline)

  // Extract results from the aggregation
  const result = aggregationResult[0]

  // Format the response
  const facets: FacetedNavigation = {
    manufacturer: {
      code: 'MANUFACTURER',
      label: 'Manufacturer',
      type: 'checkboxes',
      options: result.manufacturerFacets || [],
    },
    category: {
      code: 'CATEGORY',
      label: 'Categories',
      type: 'checkboxes',
      options: result.categoryFacets || [],
    },
    price: {
      code: 'PRICE',
      label: 'Price',
      type: 'checkboxes',
      options: result.priceFacets || [],
    },
  }

  return facets
}

export const productQueries = {
  fetchAllSlugs,
  fetchProducts,
  fetchFacets,
}
