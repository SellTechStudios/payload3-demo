import { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'productsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Products page',
    },
    {
      name: 'defaultProductCategory',
      type: 'relationship',
      relationTo: 'product-category',
      label: 'Default Product Category',
    },

    {
      type: 'tabs',
      tabs: [
        {
          label: 'Contact',
          fields: [
            {
              name: 'addressLine1',
              type: 'text',
              label: 'Address Line 1',
            },
            {
              name: 'addressLine2',
              type: 'text',
              label: 'Address Line 2',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Phone No',
            },
            {
              name: 'email',
              type: 'text',
              label: 'Email',
            },
          ],
        },
        {
          label: 'Social Media',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              label: 'Facebook',
            },
            {
              name: 'instagram',
              type: 'text',
              label: 'Instagram',
            },
            {
              name: 'linkedIn',
              type: 'text',
              label: 'LinkedIn',
            },
            {
              name: 'twitter',
              type: 'text',
              label: 'X / Twitter',
            },
            {
              name: 'pinterest',
              type: 'text',
              label: 'Pinterest',
            },
          ],
        },
      ],
    },
  ],
}
