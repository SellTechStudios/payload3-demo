import Image from 'next/image'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Locale } from '@/i18n/config'
import type { Metadata } from 'next'
import NotFound from '../../not-found'
import { RelatedPosts } from '../_components/RelatedPosts'
import RichText from '@/components/RichText'
import Section from '@/components/Section/Section'
import { cache } from 'react'
import configPromise from '@payload-config'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/utilities/generateMeta'
import { getPayload } from 'payload'
import { getUserLocale } from '@/services/locale'

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
    locale: 'all',
  })

  const params = posts.docs.map(({ slug }) => ({
    slug,
  }))

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post(props: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await props.params
  const locale = (await getUserLocale()) as Locale
  const post = await queryPostBySlug({ slug, locale })

  if (!post) {
    return <NotFound />
  }

  const imgUrl = typeof post.heroImage === 'string' ? post.heroImage : post.heroImage?.url

  return (
    <article className="pb-16">
      {draft && <LivePreviewListener />}

      {imgUrl && (
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] mb-8">
          <Image src={imgUrl} alt={post.title} className="object-cover" fill sizes="100vw" />
        </div>
      )}
      <div>
        <h1 className="mb-8 text-header1">{post.title}</h1>
        <RichText className="" data={post.content} enableGutter={false} enableProse={false} />

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <Section className="mt-16">
            <Section.Header>
              <h5 className="text-header5 ">Related posts</h5>
            </Section.Header>
            <Section.Content>
              <RelatedPosts
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-subgrid grid-rows-[2fr] col-span-3 col-start-1 mt-12"
                docs={post.relatedPosts.filter((post) => typeof post === 'object')}
              />
            </Section.Content>
          </Section>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const locale = (await getUserLocale()) as Locale
  const post = await queryPostBySlug({ slug, locale })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    locale: locale,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
