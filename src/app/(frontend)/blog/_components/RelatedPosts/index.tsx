import Link from 'next/link'
import type { Post } from '@/payload-types'
import React from 'react'
import RichText from '@/components/RichText'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import clsx from 'clsx'

export type RelatedPostsProps = {
  className?: string
  docs?: Post[]
  introContent?: SerializedEditorState
}

export const RelatedPosts: React.FC<RelatedPostsProps> = (props) => {
  const { className, docs, introContent } = props

  return (
    <div className={clsx('lg:container', className)}>
      {introContent && <RichText data={introContent} enableGutter={false} />}

      <div className="items-stretch gap-4 md:gap-8 grid grid-cols-1 md:grid-cols-2">
        {docs?.map((doc) => {
          if (typeof doc === 'string') return null

          const author = typeof doc.authors?.[0] === 'object' ? doc.authors?.[0].name : ''

          return (
            <div key={doc.id}>
              <Link
                href={`/blog/${doc.slug}`}
                className="flex-col max-w-sm overflow-hiddenflex text-gray-400 hover:text-gray-800"
              >
                <h2 className="text-header6 uppercase tracking-[0.2em]">{doc.title}</h2>
                <span>{author?.toString()}</span>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
