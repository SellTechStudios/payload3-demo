import {
  initTransactionHandler,
  p24NotificationHandler,
  submitBlikCodeHandler,
} from '@/app/_api/checkout'

import { CollectionConfig } from 'payload'
import { admins } from 'src/payload/access/admins'
import { adminsOrOrderedBy } from '../../../access/adminsOrOrderedBy'
import { clearUserCart } from './hooks/clearUserCart'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { updateUserPurchases } from './hooks/updateUserPurchases'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'createdAt',
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: (doc) => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    afterChange: [updateUserPurchases, clearUserCart],
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: admins,
    delete: admins,
  },
  endpoints: [
    {
      path: '/init-payment',
      method: 'post',
      handler: initTransactionHandler,
    },
    {
      path: '/submit-blik',
      method: 'post',
      handler: submitBlikCodeHandler,
    },
    {
      path: '/transaction-handler',
      method: 'post',
      handler: p24NotificationHandler,
    },
  ],
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
        },
      ],
    },
  ],
}
