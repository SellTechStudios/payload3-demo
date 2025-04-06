import { CollectionConfig } from 'payload'

const Manufacturer: CollectionConfig = {
  slug: 'manufacturer',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'code',
      type: 'text',
      required: true,
    },
  ],
}

export default Manufacturer
