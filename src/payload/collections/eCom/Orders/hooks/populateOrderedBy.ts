import { FieldHook } from 'payload'
import { Order } from 'src/payload-types'

export const populateOrderedBy: FieldHook<Order> = async ({ req, operation, value }) => {
  if ((operation === 'create' || operation === 'update') && !value) {
    return req.user ? req.user.id : null
  }

  return value
}
