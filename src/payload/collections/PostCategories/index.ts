import type { CollectionConfig } from 'payload'
import { checkRole } from '@/payload/access/checkRole'

export const PostCategories: CollectionConfig = {
  slug: 'postCategories',
  access: {
    read: ({ req: { user } }) => checkRole(['admin', 'conten-editor'], user),
    create: ({ req: { user } }) => checkRole(['admin', 'conten-editor'], user),
    update: ({ req: { user } }) => checkRole(['admin', 'conten-editor'], user),
    delete: ({ req: { user } }) => checkRole(['admin', 'conten-editor'], user),
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
