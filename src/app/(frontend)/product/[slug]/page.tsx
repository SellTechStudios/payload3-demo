import { detailsQueries, productQueries } from '@/db'

import { AddToCartButton } from '@/components/Cart/AddToCartButton'
import { CollectionMeta } from '@/payload/collections/eCom/_interfaces/collection-meta'
import { Container } from '@/components/Container'
import { Metadata } from 'next'
import { Product } from '@/payload-types'
import { ProductGallery } from './_components/ProductGallery'
import { ProductQuantitySelector } from '@/components/Product/ProductQuantitySelector'
import { RemoveFromCartButton } from '@/components/Cart/RemoveFromCartButton'
import { formatCurrency } from '@/utilities/formatPrice'
import { generateProductMeta } from '@/payload/utilities/generateProductMeta'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const product = await detailsQueries.fetchBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <Container>
      <section className="md:gap-16 md:grid md:grid-cols-2">
        <ProductGallery product={product} />
        <div>
          <h1 className="mt-4 md:mt-0 text-3xl">{product.title}</h1>
          <h2 className="my-4 text-red-600 text-2xl">{formatCurrency(product.price ?? 0)}</h2>
          <div className="flex items-center gap-4">
            <AddToCartButton product={product} />
            <ProductQuantitySelector product={product} />
            <RemoveFromCartButton product={product} />
          </div>
          <div className="mt-4" dangerouslySetInnerHTML={{ __html: product.description ?? '' }} />
        </div>
      </section>
    </Container>
  )
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    const products = await productQueries.fetchAllSlugs()
    return products?.map((slug) => ({ slug: slug })) || []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const slug = (await params).slug
  let product: Product | null = null
  try {
    product = await detailsQueries.fetchBySlug(slug)
  } catch (error) {
    console.error('Error generating metadata:', error)
  }

  return generateProductMeta(product as CollectionMeta, product?.slug ?? '')
}
