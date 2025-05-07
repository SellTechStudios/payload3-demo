import type { GlobalConfig } from 'payload'

import { link } from '@/payload/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { admins } from '@/payload/access/admins'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: admins,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
