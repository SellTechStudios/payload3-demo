import { FacetedNavigation, ProductItem, QueryType, SearchRequest } from './queries.types'

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

  const query: QueryType = {
    limit: 10,
    page: 1,
    depth: 0, // Don't populate relationships for performance
    where: {},
  }

  // Add search text filter if provided
  if (params.searchString) {
    query.where = {
      or: [
        { title: { contains: params.searchString } },
        { name: { contains: params.searchString } },
        { description: { contains: params.searchString } },
      ],
    }
  }

  const productsResponse = await payload.find({
    collection: 'products',
    ...query,
    select: {
      _id: true,
      isPromoted: true,
      name: true,
      price: true,
      pricePrevious: true,
      ean: true,
      mediaImages: true,
      slug: true,
      manufacturer: true,
    },
  })

  return productsResponse.docs as unknown as ProductItem[]
}

const fetchFacets = async (searchText: string = ''): Promise<FacetedNavigation> => {
  const payload = await getPayload({ config: configPromise })

  // Define the MongoDB match stage for filtering products
  const matchStage: any = {}

  // Add search text filter if provided
  if (searchText) {
    matchStage.$or = [
      { title: { $regex: searchText, $options: 'i' } },
      { name: { $regex: searchText, $options: 'i' } },
      { description: { $regex: searchText, $options: 'i' } },
      { keywords: { $regex: searchText, $options: 'i' } },
    ]
  }

  // Define price ranges for faceting
  const priceRanges = [
    { $lte: ['$price', 10], range: '0-10' },
    { $and: [{ $gt: ['$price', 10] }, { $lte: ['$price', 50] }], range: '11-50' },
    { $and: [{ $gt: ['$price', 50] }, { $lte: ['$price', 100] }], range: '51-100' },
    { $and: [{ $gt: ['$price', 100] }, { $lte: ['$price', 500] }], range: '101-500' },
    { $gt: ['$price', 500], range: '501+' },
  ]

  // Use MongoDB's aggregation framework to generate facets
  const aggregationPipeline: PipelineStage[] = [
    { $match: matchStage },
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
    {
      $addFields: {
        categoryId: {
          $toString: '$categoryDetails._id',
        },
        categoryName: '$categoryDetails.name',
      },
    },

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
      $addFields: {
        manufacturerId: {
          $toString: '$manufacturerDetails._id',
        },
        manufacturerName: '$manufacturerDetails.name',
      },
    },

    {
      $project: {
        Category: 0,
        categoryDetails: 0,
        manufacturer: 0,
        manufacturerDetails: 0,
      },
    },

    {
      $facet: {
        // Manufacturer facets
        manufacturerFacets: [
          {
            $group: {
              _id: '$manufacturerId',
              name: { $first: '$manufacturerName' },
              count: { $sum: 1 },
            },
          },
          { $match: { _id: { $ne: null } } },
          { $sort: { count: -1 } },
          { $project: { _id: 0, label: '$name', count: 1, value: '$_id' } },
        ],

        // Bestseller facets
        bestsellerFacets: [
          {
            $group: {
              _id: {
                value: '$bestseller',
              },
              count: { $sum: 1 },
            },
          },

          {
            $project: {
              _id: 0,
              label: {
                $cond: {
                  if: { $eq: ['$_id.value', true] },
                  then: 'Bestseller',
                  else: 'Inne',
                },
              },
              count: 1,
              value: '$_id.value',
            },
          },
        ],

        // Category facets
        categoryFacets: [
          { $group: { _id: '$categoryId', name: { $first: '$categoryName' }, count: { $sum: 1 } } },
          { $match: { _id: { $ne: null } } },
          { $sort: { count: -1 } },
          { $project: { _id: 0, label: '$name', count: 1, value: '$_id' } },
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
    // price: result.priceFacets || [],
    manufacturer: {
      label: 'Manufacturer',
      options: result.manufacturerFacets || [],
    },
    bestseller: {
      label: 'Bestselling Products',
      options: result.bestsellerFacets || [],
    },
    category: {
      label: 'Categories',
      options: result.categoryFacets || [],
    },
  }

  return facets
}

export const productQueries = {
  fetchAllSlugs,
  fetchProducts,
  fetchFacets,
}
