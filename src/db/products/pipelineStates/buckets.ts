export const documentsBucket = (pageSize: number) => ({
  documents: [{ $limit: pageSize }],
})

export const manufacturerBucket = () => ({
  Manufacturer: [
    {
      $group: {
        _id: {
          id: '$manufacturerId',
          name: '$manufacturer',
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1, '_id.name': 1 },
    },
    {
      $project: {
        _id: 0,
        id: '$_id.id',
        name: '$_id.name',
        count: 1,
      },
    },
  ],
})

export const priceBucket = (bounds: number[]) => ({
  Price: [
    {
      $bucket: {
        groupBy: '$price',
        boundaries: bounds,
        default: 'Other',
        output: {
          count: {
            $sum: 1,
          },
        },
      },
    },
    {
      $project: {
        _id: 1,
        count: 1,
        lowerBound: {
          $cond: [{ $eq: ['$_id', 'Other'] }, null, '$_id'],
        },
        upperBound: {
          $cond: [
            { $eq: ['$_id', 'Other'] },
            null,
            {
              $arrayElemAt: [
                bounds,
                {
                  $add: [
                    {
                      $indexOfArray: [bounds, '$_id'],
                    },
                    1,
                  ],
                },
              ],
            },
          ],
        },
      },
    },
  ],
})

export const promotedBucket = () => ({
  Promoted: [
    {
      $group: {
        _id: {
          id: '$isPromoted',
          name: {
            $cond: [{ $eq: ['$isPromoted', true] }, 'Promocja', 'Cena regularna'],
          },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $project: {
        _id: 0,
        name: '$_id.name',
        count: 1,
      },
    },
  ],
})
