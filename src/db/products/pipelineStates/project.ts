import { PipelineStage } from 'mongoose'

export const toProductSearchItem: PipelineStage = {
  $project: {
    _id: 0,
    id: {
      $toString: '$_id',
    },
    specialOffer: 1,
    name: 1,
    price: 1,
    pricePrevious: 1,
    ean: 1,
    mediaImages: 1,
    slug: 1,
    manufacturer: '$manufacturer.name',
    manufacturerId: { $toString: '$manufacturer._id' },
  },
}
export const toSliderItem: PipelineStage = {
  $project: {
    _id: 0,
    id: {
      $toString: '$_id',
    },
    name: 1,
    price: 1,
    pricePrevious: 1,
    ean: 1,
    mediaImages: 1,
    slug: 1,
  },
}
