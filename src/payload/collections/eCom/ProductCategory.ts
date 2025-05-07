import { CollectionConfig } from 'payload'
import { noone } from '@/payload/access/noone'
import { checkRole } from '@/payload/access/checkRole'

const ProductCategory: CollectionConfig = {
  slug: 'product-category',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: ({ req: { user } }) => checkRole(['admin', 'pim-manager'], user),
    create: noone,
    update: noone,
    delete: noone,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}

export default ProductCategory
