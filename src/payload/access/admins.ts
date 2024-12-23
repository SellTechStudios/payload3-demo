import type { AccessArgs, User } from 'payload'

import { checkRole } from './checkRole'

type isAdmin = (args: AccessArgs<User>) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
  if (user !== null) {
    return checkRole(['admin'], user)
  }
  return false
}
