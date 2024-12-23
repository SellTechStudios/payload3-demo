import type { Block } from 'payload'

export const ProductsSliderBlock: Block = {
  slug: 'productsSlider',
  labels: {
    singular: 'Products Slider',
    plural: 'Products Sliders',
  },
  fields: [
    {
      name: 'ProductsCount',
      type: 'number',
      label: 'Products Count',
      required: true,
    },
    {
      name: 'Description',
      type: 'text',
    },
    {
      name: 'ListType',
      type: 'select',
      label: 'List Type',
      defaultValue: 'Recent',
      options: [
        {
          label: 'Bestsellers',
          value: 'Bestsellers',
        },
        {
          label: 'Recently Added',
          value: 'Recent',
        },
      ],
    },
  ],
}
