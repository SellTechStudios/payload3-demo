/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'

import { RelatedPosts } from '@/app/(frontend)/blog/[slug]/components/RelatedPosts'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { generateMeta } from '@/payload/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import NotFound from '../../not-found'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  if (!post) return <NotFound />

  const imageUrl = typeof post.heroImage === 'string' ? post.heroImage : post.heroImage?.url
  const date = new Date(post.createdAt).toLocaleDateString()
  const authors =
    post.authors?.map((author) => (typeof author === 'object' ? author.name : author)).join(', ') ||
    ''

  return (
    <article className="-mt-8 pb-16">
      <PageClient />

      {draft && <LivePreviewListener />}

      <div className="flex flex-col items-center gap-4">
        {imageUrl && <img src={imageUrl} alt="hero" className="w-full h-96 object-cover" />}

        <div className="container prose -mt-16 bg-white rounded-md shadow-sm py-4">
          <h1 className="mb-4">{post.title}</h1>
          <div className="text-gray-600 italic mb-8 text-sm">
            <div>Created: {date}</div>
            <div>By: {authors}</div>
          </div>

          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />

          {post.relatedPosts && (
            <RelatedPosts docs={post.relatedPosts.filter((post) => typeof post === 'object')} />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    depth: 2,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
