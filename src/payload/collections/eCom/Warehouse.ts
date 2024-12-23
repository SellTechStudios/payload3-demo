import { CollectionConfig } from 'payload'

const Warehouse: CollectionConfig = {
  slug: 'warehouses',
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

export default Warehouse
