import { CategoryNavigationClient } from './Component.Client'
import { LoadingShimmer } from '@/components/LoadingShimmer'
import { Suspense } from 'react'
import { categoryQueries } from '@/db'

export const CategoryNavigation = async () => {
  const categories = await categoryQueries.fetchAllCategories()

  return (
    <>
      <h3 className="text-lg font-bold mb-2 mt-4">Kategorie</h3>
      <Suspense fallback={<LoadingShimmer />}>
        <CategoryNavigationClient categories={categories} />
      </Suspense>
    </>
  )
}
