import { CollectionConfig } from 'payload'

const Manufacturer: CollectionConfig = {
  slug: 'manufacturer',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'erpId',
      type: 'text',
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
  ],
}

export default Manufacturer
