import { checkRole } from '@/payload/access/checkRole'
import type { CollectionConfig } from 'payload'

export const PostCategories: CollectionConfig = {
  slug: 'postCategories',
  access: {
    read: ({ req: { user } }) => checkRole(['admin', 'content-editor'], user),
    create: ({ req: { user } }) => checkRole(['admin', 'content-editor'], user),
    update: ({ req: { user } }) => checkRole(['admin', 'content-editor'], user),
    delete: ({ req: { user } }) => checkRole(['admin', 'content-editor'], user),
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
