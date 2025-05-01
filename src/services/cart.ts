import configPromise from '@payload-config'
import { cookies } from 'next/headers'
import { getPayload } from 'payload'

export const getServerCart = async () => {
  const cookieHeader = await cookies()
  const token = cookieHeader.get('payload-token')?.value

  if (!token) {
    return { items: [] }
  }

  const payload = await getPayload({ config: configPromise })

  const user = await payload.find({
    collection: 'users',
    where: {
      _verifiedToken: { equals: token }, // Zakładając że trzymasz token w `users._verifiedToken`
    },
  })

  const loggedUser = user.docs[0]
  return loggedUser?.cart || { items: [] }
}
