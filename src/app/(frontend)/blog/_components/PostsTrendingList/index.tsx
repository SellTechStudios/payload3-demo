import { BasePayload, getPayload } from 'payload'

import { Locale } from '@/i18n/config'
import { Post } from '@/payload-types'
import { PostsListClient } from './PostsList.client'
import { Suspense } from 'react'
import config from '@payload-config'
import { getUserLocale } from '@/services/locale'

async function getTrendingPosts({ payload, locale }: { payload: BasePayload; locale: Locale }) {
  return (
    (
      await payload.find({
        collection: 'posts',
        depth: 1,
        limit: 5,
        locale,
        where: {
          isTrending: {
            equals: true,
          },
        },
        sort: '-created_at',
        pagination: false,
      })
    )?.docs || []
  )
}

export const PostsTrendingList = async () => {
  const payload = await getPayload({ config })
  const locale = (await getUserLocale()) as Locale
  const posts: Post[] = await getTrendingPosts({ payload, locale })

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <PostsListClient posts={posts} />
    </Suspense>
  )
}
