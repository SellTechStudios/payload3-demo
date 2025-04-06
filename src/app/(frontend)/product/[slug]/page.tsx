import { detailsQueries, productQueries } from '@/db'

import { AddToCartButton } from '@/components/Cart/AddToCartButton'
import { CollectionMeta } from '@/payload/collections/eCom/_interfaces/collection-meta'
import { Container } from '@/components/Container'
import { Metadata } from 'next'
import { ProductDetails } from '@/db/products/queries.types'
import { ProductGallery } from './_components/ProductGallery'
import { ProductQuantitySelector } from '@/components/ProductQuantitySelector'
import { RemoveFromCartButton } from '@/components/Cart/RemoveFromCartButton'
import { formatCurrency } from '@/utilities/formatPrice'
import { generateProductMeta } from '@/payload/utilities/generateProductMeta'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const product: ProductDetails = await detailsQueries.fetchBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <Container>
      <section className="md:gap-16 md:grid md:grid-cols-2">
        <ProductGallery product={product} />
        <div>
          <h1 className="text-3xl mt-4 md:mt-0">{product.name}</h1>
          <h2 className="text-red-600 text-2xl my-4">{formatCurrency(product.price ?? 0)}</h2>
          <div className="flex gap-4 items-center">
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
  let product: ProductDetails | null = null
  try {
    product = await detailsQueries.fetchBySlug(slug)
  } catch (error) {
    console.error('Error generating metadata:', error)
  }

  return generateProductMeta(product as CollectionMeta, product?.slug ?? '')
}
