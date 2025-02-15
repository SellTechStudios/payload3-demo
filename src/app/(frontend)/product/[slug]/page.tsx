import { AddToCartButton } from '@/components/Cart/AddToCartButton'
import { RemoveFromCartButton } from '@/components/Cart/RemoveFromCartButton'
import { Container } from '@/components/Container'
import { ProductQuantitySelector } from '@/components/ProductQuantitySelector'
import { detailsQueries } from '@/db'
import { ProductDetails } from '@/db/products/detailsQueries'
import { CollectionMeta } from '@/payload/collections/eCom/_interfaces/collection-meta'
import { generateProductMeta } from '@/payload/utilities/generateProductMeta'
import { formatCurrency } from '@/utilities/formatPrice'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductGallery } from './_components/ProductGallery'

export const dynamic = 'force-dynamic'

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const product: ProductDetails = await detailsQueries.fetchBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <Container>
      <section className="md:gap-4 md:grid md:grid-cols-2">
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
    const products = await detailsQueries.fetchAll()
    return products?.map(({ slug }) => ({ slug: slug || '' })) || []
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
