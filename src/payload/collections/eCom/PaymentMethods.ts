import { paymnetMethodsHandler } from '@/app/_api/checkout'
import { CollectionConfig } from 'payload'
import { admins } from 'src/payload/access/admins'
import { noone } from 'src/payload/access/noone'

export const PaymentMethods: CollectionConfig = {
  slug: 'payment-methods',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'id'],
  },
  access: {
    read: admins,
    update: noone,
    create: noone,
    delete: noone,
  },
  endpoints: [
    {
      path: '/p24',
      method: 'get',
      handler: paymnetMethodsHandler,
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'id',
      type: 'number',
      required: true,
    },
  ],
}
