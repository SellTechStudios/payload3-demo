import { Order, User } from 'src/payload-types'

import { AfterChangeHook } from 'node_modules/payload/dist/collections/config/types'

export const updateUserPurchases: AfterChangeHook<Order> = async ({ doc, req, operation }) => {
  const { payload } = req

  if ((operation === 'create' || operation === 'update') && doc.orderedBy && doc.items) {
    const orderedBy = typeof doc.orderedBy === 'string' ? doc.orderedBy : doc.orderedBy.id

    const user = (await payload.findByID({
      collection: 'users',
      id: orderedBy,
    })) as unknown as User

    if (user) {
      await payload.update({
        collection: 'users',
        id: orderedBy,
        data: {
          purchases: [
            ...(user?.purchases?.map((purchase) =>
              typeof purchase === 'string' ? purchase : purchase.id,
            ) || []),
            ...(doc?.items?.map(({ product }) =>
              typeof product === 'string' ? product : product.id,
            ) || []),
          ],
        },
      })
    }
  }

  return
}
