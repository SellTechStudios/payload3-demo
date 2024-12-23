import { ProductsList } from '@/app/(frontend)/products/_components/product-list/Component'

export default async function PromotedProductListPage() {
  return (
    <>
      <h2 className="col-span-full text-4xl">Oferty Specjalne</h2>
      <ProductsList listType="specialOffer" />
    </>
  )
}
