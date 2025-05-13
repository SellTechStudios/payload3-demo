import type { FieldHook } from 'payload'

import type { User } from '@/payload-types'

// ensure there is always a `customer` role
// do not let non-admins change roles
export const protectRoles: FieldHook<User> = ({ data, req, originalDoc }) => {
  const currentUserIsAdmin = req.user?.roles?.includes('admin')

  if (!currentUserIsAdmin) {
    return originalDoc?.roles
  }

  const incomingRoles = data?.roles || []
  const roleSet = new Set(incomingRoles)
  roleSet.add('customer')
  return [...roleSet]
}
