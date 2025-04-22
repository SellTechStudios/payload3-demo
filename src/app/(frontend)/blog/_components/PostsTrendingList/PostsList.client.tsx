'use client'

import Link from 'next/link'
import { Post } from '@/payload-types'

export type ProductListClientProps = {
  posts: Post[]
}

export const PostsListClient = (props: ProductListClientProps) => {
  const { posts } = props

  return (
    <div className="flex flex-col gap-4">
      {posts.map((p) => {
        const author = typeof p.authors?.[0] === 'object' ? p.authors?.[0].name : ''

        return (
          <div key={p.id}>
            <Link
              href={`blog/${p.slug}`}
              className="flex-col max-w-sm overflow-hiddenflex text-gray-400 hover:text-gray-800"
            >
              <h2 className="text-header6 uppercase tracking-[0.2em]">{p.title}</h2>
              <span>{author?.toString()}</span>
            </Link>
          </div>
        )
      })}
    </div>
  )
}
