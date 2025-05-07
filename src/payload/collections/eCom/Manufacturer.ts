import { checkRole } from '@/payload/access/checkRole'
import { noone } from '@/payload/access/noone'
import { CollectionConfig } from 'payload'

const Manufacturer: CollectionConfig = {
  slug: 'manufacturer',
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
      name: 'code',
      type: 'text',
      required: true,
    },
  ],
}

export default Manufacturer
