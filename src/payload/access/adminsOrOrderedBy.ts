import { Access } from 'payload'
import { checkRole } from './checkRole'

export const adminsOrOrderedBy: Access = ({ req: { user } }) => {
  if (checkRole(['admin'], user!)) {
    return true
  }

  return {
    orderedBy: {
      equals: user?.id,
    },
  }
}
