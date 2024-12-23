/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next/types'
import PageClient from './page.client'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    depth: 2,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      heroImage: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <div className="grid grid-cols-3 gap-8 container">
        {posts.docs.map((post) => (
          <a
            href={`/blog/${post.slug}`}
            key={post.id}
            className="max-w-sm border border-gray-200 rounded-lg shadow"
          >
            {typeof post.heroImage === 'object' && post.heroImage !== null && (
              <img
                className="rounded-t-lg"
                src={post.heroImage.url ?? ''}
                alt={post.heroImage.alt ?? ''}
              />
            )}
            <div className="p-5 prose">
              <h5 className="mb-2 text-2xl font-bold tracking-tight">{post.title}</h5>
            </div>
          </a>
        ))}
      </div>

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}
