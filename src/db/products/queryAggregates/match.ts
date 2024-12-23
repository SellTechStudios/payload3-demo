import { ObjectId } from 'mongodb'

export const specialOffersMatch = () => ({
  specialOffer: { $eq: true },
})

export const inCategoryMatch = (categoryId: string) => {
  const idObject = new ObjectId(categoryId)

  return {
    Category: { $eq: idObject },
  }
}
