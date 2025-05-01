import { FacetedNavigation, ProductSearchResponse, SearchRequest } from './queries.types'

import configPromise from '@payload-config'
import { Document, ObjectId } from 'mongodb'
import { PipelineStage } from 'mongoose'
import { getPayload } from 'payload'

const getSortStage = (params: SearchRequest): PipelineStage.Sort => {
  switch (params.sort) {
    case 'price-asc':
      return { $sort: { price: 1 } }
    case 'price-desc':
      return { $sort: { price: -1 } }
    case 'bestseller':
      return { $sort: { bestseller: -1 } }
    case 'newest':
    default:
      return { $sort: { createdAt: -1 } } // domyślnie najnowsze
  }
}

const getMatchStage = (params: SearchRequest): PipelineStage.Match => {
  const match: Document = {}

  // QUICKSEARCH
  if (params.type === 'quicksearch' && params.searchString) {
    match.$or = [
      { title: { $regex: params.searchString, $options: 'i' } },
      { name: { $regex: params.searchString, $options: 'i' } },
      { description: { $regex: params.searchString, $options: 'i' } },
    ]
  }

  // CATEGORY FILTER
  if (params.category?.length) {
    match['Category'] = { $in: params.category.map((id) => new ObjectId(id)) }
  }

  // MANUFACTURER FILTER
  if (params.manufacturer?.length) {
    match['manufacturer'] = { $in: params.manufacturer.map((id) => new ObjectId(id)) }
  }

  // PRICE FILTER
  if (params.price?.length) {
    const priceConditions = params.price
      .map((range) => {
        const [minStr, maxStr] = range.split('-')
        const min = parseFloat(minStr)

        if (isNaN(min)) return undefined
        if (maxStr === undefined) {
          return { price: { $gte: min } }
        }

        const maxVal = parseFloat(maxStr)
        return { price: { $gte: min, $lt: maxVal } }
      })
      .filter(Boolean)

    if (priceConditions.length > 0) {
      match.$and = match.$and || []
      match.$and.push({ $or: priceConditions })
    }
  }

  if (params.type === 'bestseller') {
    match['bestseller'] = true
  }

  return { $match: match }
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

  const pageSize = params.pageSize || 9
  const skip = ((params.page || 1) - 1) * pageSize

  const pipeline: PipelineStage[] = [
    getMatchStage(params),
    {
      $facet: {
        products: [
          getSortStage(params),
          { $skip: skip },
          { $limit: pageSize },
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
            },
          },
        ],
        paging: [{ $count: 'total' }],
      },
    },
    {
      $project: {
        products: 1,
        paging: { $arrayElemAt: ['$paging', 0] },
      },
    },
  ]

  const model = payload.db.collections['products']
  const aggregationResult = await model.aggregate(pipeline)

  const response: ProductSearchResponse = {
    products: aggregationResult[0].products,
    total: aggregationResult[0].paging?.total || 0,
  }

  return response
}

const fetchFacets = async (params: SearchRequest): Promise<FacetedNavigation> => {
  const payload = await getPayload({ config: configPromise })

  const pipeline: PipelineStage[] = [
    getMatchStage(params),

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
