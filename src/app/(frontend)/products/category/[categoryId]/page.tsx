import { ProductsList } from '@/app/(frontend)/products/_components/product-list/Component'
import { categoryQueries } from '@/db'

export default async function ProductListCategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>
}) {
  const id = (await params).categoryId
  const category = await categoryQueries.fetchById(id)

  return (
    <>
      <h2 className="col-span-full text-4xl">Produkty w kategorii &apos;{category.name}&apos;</h2>
      <ProductsList listType="incategory" categoryId={id} />
    </>
  )
}
