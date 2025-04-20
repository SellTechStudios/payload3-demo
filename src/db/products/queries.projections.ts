export const ProjectToProductItem = {
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
}
