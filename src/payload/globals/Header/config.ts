import type { GlobalConfig } from 'payload'

import { link } from '@/payload/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { admins } from '@/payload/access/admins'

export const Header: GlobalConfig = {
  slug: 'header',
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
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
