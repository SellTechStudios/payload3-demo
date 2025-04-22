/* eslint-disable @next/next/no-img-element */
'use client'

import Link from 'next/link'
import { Post } from '@/payload-types'

export type ProductListClientProps = {
  posts: Post[]
}

export const PostsListClient = (props: ProductListClientProps) => {
  const { posts } = props

  return (
    <div className="gap-16 grid grid-cols-1 md:grid-cols-2">
      {posts.map((p) => {
        const imgUrl = typeof p.heroImage === 'string' ? p.heroImage : p.heroImage?.url
        const author = typeof p.authors?.[0] === 'object' ? p.authors?.[0].name : ''
        const publicationDate =
          typeof p.publishedAt === 'string'
            ? new Date(p.publishedAt).toLocaleDateString('en-GB').replace(/\//g, '.')
            : ''

        return (
          <div key={p.id} className="flex flex-col gap-4">
            <Link
              href={`blog/${p.slug}`}
              className="flex-col max-w-sm overflow-hiddenflex text-gray-400 hover:text-gray-800"
            >
              <img
                src={
                  imgUrl ||
                  'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                }
                alt={p.title}
                className="mb-8 w-full h-48 object-cover"
              />

              {/* Main content */}
              <h2 className="mt-4 mb-4 font-mono text-[15px] uppercase tracking-[0.2em]">
                {p.title}
              </h2>
            </Link>

            {/* author and date */}
            <div className="font-mono text-gray-400 text-xs uppercase tracking-[0.2em]">
              {author?.toString()} | {publicationDate}
            </div>

            {/* description */}
            {p.description && <div className="font-mono">{p.description}</div>}

            {/* Footer */}
            <div className="flex flex-row justify-between items-center">
              {/* tags */}
              <div>
                {p.tags?.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`blog?tag=${tag.tag}`}
                    className="inline-block bg-gray-100 hover:bg-gray-300 mr-2 px-2 py-1 rounded-full font-mono font-semibold text-gray-800 text-xs"
                  >
                    {tag.tag}
                  </Link>
                ))}
              </div>
              <Link
                href={`blog/${p.slug}`}
                className="bg-gray-200 hover:bg-gray-300 px-4 py-2 font-mono text-gray-800 text-xs uppercase tracking-[0.2em]"
              >
                Read more ›
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
