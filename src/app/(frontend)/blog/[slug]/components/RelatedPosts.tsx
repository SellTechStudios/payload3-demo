import type { Post } from '@/payload-types'
import React from 'react'

export type RelatedPostsProps = {
  docs?: Post[]
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { docs } = props

  return (
    <div className="prose mt-12">
      <h4>Powiązane Artykuły</h4>

      <div className="flex flex-col gap-4">
        {docs?.map((doc) => {
          if (typeof doc === 'string') return null

          return (
            <a
              href={`/blog/${doc.slug}`}
              key={doc.id}
              className="block bg-gray-200 hover:bg-gray-300 no-underline rounded-md shadow-sm p-4"
            >
              {doc.title}
            </a>
          )
        })}
      </div>
    </div>
  )
}
