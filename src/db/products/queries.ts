import { FacetedNavigation, ProductItem, SearchRequest } from './queries.types'

import { PipelineStage } from 'mongoose'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

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
  const { searchString } = params

  // Define the MongoDB match stage for filtering products
  const matchStage: Record<string, unknown> = {}

  // Add search text filter if provided
  if (searchString) {
    matchStage.$or = [
      { title: { $regex: searchString, $options: 'i' } },
      { name: { $regex: searchString, $options: 'i' } },
      { description: { $regex: searchString, $options: 'i' } },
    ]
  }

  // Use MongoDB's aggregation framework to generate facets
  const aggregationPipeline: PipelineStage[] = []

  switch (params.type) {
    case 'all':
      aggregationPipeline.push({ $match: matchStage })
      aggregationPipeline.push({ $sort: { title: 1 } })
      break
    case 'new':
      aggregationPipeline.push({ $sort: { createdAt: 1 } })
      break
    case 'bestseller':
      aggregationPipeline.push({ $sort: { bestseller: 1 } })
      break
    case 'quicksearch':
      break
  }

  aggregationPipeline.push({ $limit: 10 })
  aggregationPipeline.push({
    $project: {
      _id: 0,
      id: {
        $toString: '$_id',
      },
      bestseller: 1,
      title: 1,
      price: 1,
      pricePrevious: 1,
      mediaImages: 1,
      slug: 1,
    },
  })

  const model = payload.db.collections['products']
  const aggregationResult = await model.aggregate(aggregationPipeline)

  return aggregationResult as ProductItem[]
}

const fetchFacets = async (params: SearchRequest): Promise<FacetedNavigation> => {
  const payload = await getPayload({ config: configPromise })
  const { searchString } = params

  // Define the MongoDB match stage for filtering products
  const matchStage: Record<string, unknown> = {}

  // Add search text filter if provided
  if (searchString) {
    matchStage.$or = [
      { title: { $regex: searchString, $options: 'i' } },
      { name: { $regex: searchString, $options: 'i' } },
      { description: { $regex: searchString, $options: 'i' } },
    ]
  }

  // Use MongoDB's aggregation framework to generate facets
  const aggregationPipeline: PipelineStage[] = [
    { $match: matchStage },

    // Combined lookup for categories with direct field mapping
    {
      $lookup: {
        from: 'product-categories',
        localField: 'Category',
        foreignField: '_id',
        as: 'categoryDetails',
      },
    },

    // Combined lookup for manufacturers with direct field mapping
    {
      $lookup: {
        from: 'manufacturers',
        localField: 'manufacturer',
        foreignField: '_id',
        as: 'manufacturerDetails',
      },
    },

    // Single addFields stage to add all derived fields
    {
      $addFields: {
        categoryId: {
          $toString: { $arrayElemAt: ['$categoryDetails._id', 0] },
        },
        categoryName: { $arrayElemAt: ['$categoryDetails.name', 0] },
        manufacturerId: {
          $toString: { $arrayElemAt: ['$manufacturerDetails._id', 0] },
        },
        manufacturerName: { $arrayElemAt: ['$manufacturerDetails.name', 0] },
      },
    },

    {
      $project: {
        categoryId: 1,
        categoryName: 1,
        manufacturerId: 1,
        manufacturerName: 1,
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
          { $sort: { count: -1 } },
          { $project: { _id: 0, label: '$name', count: 1, value: '$_id' } },
        ],

        // Bestseller facets
        bestsellerFacets: [
          {
            $group: {
              _id: '$bestseller',
              count: { $sum: 1 },
            },
          },
          {
            $project: {
              _id: 0,
              label: {
                $cond: {
                  if: { $eq: ['$_id', true] },
                  then: 'Bestseller',
                  else: 'Inne',
                },
              },
              count: 1,
              value: '$_id',
            },
          },
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
          { $sort: { count: -1 } },
          { $project: { _id: 0, label: '$name', count: 1, value: '$_id' } },
        ],

        // Price facets
        priceFacets: [
          {
            $bucket: {
              groupBy: '$price',
              boundaries: [0, 50, 100, 500, 1000],
              default: 'Other',
              output: {
                count: { $sum: 1 },
              },
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
                    { case: { $eq: ['$_id', 100] }, then: '100-500' },
                  ],
                  default: 'Other',
                },
              },
              count: 1,
              value: {
                $switch: {
                  branches: [
                    { case: { $eq: ['$_id', 0] }, then: '0-50' },
                    { case: { $eq: ['$_id', 50] }, then: '50-100' },
                    { case: { $eq: ['$_id', 100] }, then: '100-500' },
                  ],
                  default: 'Other',
                },
              },
            },
          },
        ],
      },
    },
  ]

  // Execute the aggregation pipeline directly on MongoDB
  const model = payload.db.collections['products']
  const aggregationResult = await model.aggregate(aggregationPipeline)

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
    bestseller: {
      code: 'BESTSELLER',
      label: 'Bestselling Products',
      type: 'checkboxes',
      options: result.bestsellerFacets || [],
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
