import { CartItems, Product } from 'src/payload-types'

import { AfterDeleteHook } from 'node_modules/payload/dist/collections/config/types'

export const deleteProductFromCarts: AfterDeleteHook<Product> = async ({ req, id }) => {
  const usersWithProductInCart = await req.payload.find({
    collection: 'users',
    overrideAccess: true,
    where: {
      'cart.items.product': {
        equals: id,
      },
    },
  })

  if (usersWithProductInCart.totalDocs > 0) {
    await Promise.all(
      usersWithProductInCart.docs.map(async (user) => {
        const cart = user.cart as { items: CartItems }
        const itemsWithoutProduct = cart?.items?.filter((item) => item.product !== id)
        const cartWithoutProduct = {
          ...cart,
          items: itemsWithoutProduct,
        }

        return req.payload.update({
          collection: 'users',
          id: user.id,
          data: {
            cart: cartWithoutProduct,
          },
        })
      }),
    )
  }
}
