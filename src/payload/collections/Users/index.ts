import { admins } from '@/payload/access/admins'
import adminsAndUser from '@/payload/access/adminsAndUser'
import { anyone } from '@/payload/access/anyone'
import { checkRole } from '@/payload/access/checkRole'
import { protectRoles } from '@/payload/hooks/protectRoles'
import { CollectionConfig } from 'payload'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user!),
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'surname',
      type: 'text',
    },
    {
      name: 'phoneNumber',
      label: 'Numer telefonu',
      type: 'text',
      required: false,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'customer',
          value: 'customer',
        },
      ],
      hooks: {
        beforeChange: [protectRoles],
      },
    },
    {
      name: 'purchases',
      label: 'Purchases',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      hooks: {
        beforeChange: [resolveDuplicatePurchases],
      },
    },
    {
      name: 'favourites',
      label: 'Favourite Products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      hooks: {
        beforeChange: [resolveDuplicatePurchases],
      },
    },
    {
      label: 'Cart',
      name: 'cart',
      type: 'group',
      fields: [
        {
          name: 'items',
          label: 'Items',
          type: 'array',
          interfaceName: 'CartItems',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'quantity',
              type: 'number',
              min: 0,
              admin: {
                step: 1,
              },
            },
          ],
        },
      ],
    },
    {
      name: 'addresses',
      label: 'Adresy',
      type: 'array',
      fields: [
        {
          name: 'zipCode',
          label: 'Kod pocztowy',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          label: 'Miasto',
          type: 'text',
          required: true,
        },
        {
          name: 'street',
          label: 'Ulica',
          type: 'text',
          required: true,
        },
        {
          name: 'houseNumber',
          label: 'Numer domu',
          type: 'text',
          required: true,
        },
        {
          name: 'apartmentNumber',
          label: 'Numer mieszkania',
          type: 'text',
          required: false,
        },
      ],
    },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
  ],
  timestamps: true,
}
