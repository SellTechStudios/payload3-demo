import { PipelineStage } from 'mongoose'

export const joinWithManufacturers: PipelineStage[] = [
  //join with manufacturer
  {
    $addFields: {
      manufacturerId: { $toObjectId: '$manufacturer' },
    },
  },
  {
    $lookup: {
      from: 'manufacturers',
      localField: 'manufacturerId',
      foreignField: '_id',
      as: 'manufacturer',
    },
  },
  {
    $unwind: {
      path: '$manufacturer',
    },
  },
]
