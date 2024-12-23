import { ProductsList } from '@/app/(frontend)/products/_components/product-list/Component'

export default async function ProductListCategoryPage() {
  return (
    <>
      <h2 className="col-span-full text-4xl">Wszystkie Produkty</h2>
      <ProductsList listType="all" />
    </>
  )
}
