import type { Block } from 'payload'

export const ProductsShowcaseBlock: Block = {
  slug: 'productsShowcaseBlock',
  interfaceName: 'ProductsShowcaseBlock',
  labels: {
    singular: 'Products Showcase',
    plural: 'Products Showcase',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      unique: true,
      minRows: 1,
      maxDepth: 1,
    },
  ],
}
