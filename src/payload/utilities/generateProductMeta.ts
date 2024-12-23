import { CollectionMeta } from '../collections/eCom/_interfaces/collection-meta'
import type { Metadata } from 'next'
import { mergeOpenGraph } from './mergeOpenGraph'

export const generateProductMeta = async (
  meta: CollectionMeta,
  slug: string | string[],
): Promise<Metadata> => {
  const ogImage = meta?.seoImageUrl

  return {
    title: meta?.seoTitle || 'Mediapart',
    description: meta?.seoDescription ?? undefined,
    openGraph: mergeOpenGraph({
      title: meta?.seoTitle || 'Mediapart',
      description: meta?.seoDescription ?? undefined,
      url: Array.isArray(slug) ? slug.join('/') : '/',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
    }),
  }
}
