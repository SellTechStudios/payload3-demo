import { ProductsList } from '@/app/(frontend)/products/_components/product-list/Component'

export default async function NewProductsListPage() {
  return (
    <>
      <h2 className="col-span-full text-4xl">Nowości</h2>
      <ProductsList listType="new" />
    </>
  )
}
