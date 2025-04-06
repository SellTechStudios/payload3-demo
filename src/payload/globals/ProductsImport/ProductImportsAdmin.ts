import { GlobalConfig } from 'payload'

export const ProductImportsAdmin: GlobalConfig = {
  slug: 'product-imports',
  versions: false,
  label: {
    en: 'Tramp4',
  },
  admin: {
    group: 'Product Imports',
    components: {
      views: {
        edit: {
          root: {
            Component: '/payload/globals/ProductsImport/ImportsDefaultUI',
          },
        },
      },
    },
    hideAPIURL: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
  ],
}
