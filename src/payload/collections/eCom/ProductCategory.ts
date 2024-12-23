import { CollectionConfig } from 'payload'
import { admins } from '@/payload/access/admins'

const ProductCategory: CollectionConfig = {
  slug: 'product-category',
  admin: {
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
    create: admins,
    update: admins,
    delete: admins,
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
