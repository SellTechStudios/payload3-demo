import type { FieldHook } from 'payload';

import type { User } from '@/payload-types';

// ensure there is always a `customer` role
// do not let non-admins change roles
export const protectRoles: FieldHook<User> = ({ data, req }) => {
  const currentUserIsAdmin = req.user?.roles?.includes('admin')
  const incomingRoles = data?.roles || []

  if (!currentUserIsAdmin) {
    return ['customer']
  }

  const roleSet = new Set(incomingRoles)
  roleSet.add('customer')
  return [...roleSet]
}