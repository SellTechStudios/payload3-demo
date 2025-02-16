import { ProductsList, ProductsListProps } from '../_components/product-list/Component'

import { CategoryNavigation } from '@/app/(frontend)/products/_components/category-nav/Component'
import { Container } from '@/components/Container'
import { categoryQueries } from '@/db'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ filterType: string }>
  searchParams: Promise<{ [key: string]: string | undefined }>
}

export default async function ProductList({ params, searchParams }: PageProps) {
  const filterType = (await params).filterType
  const categoryId = (await searchParams).categoryId
  const searchString = (await searchParams).searchString

  let productListProps: ProductsListProps
  let title: string

  // Validate and map the route parameters to our union type
  switch (filterType) {
    case 'all':
      title = 'Wszystkie Produkty'
      productListProps = { listType: filterType }
      break

    case 'new':
      title = 'Nowości'
      productListProps = { listType: filterType }
      break

    case 'specialOffer':
      title = 'Oferty Specjalne'
      productListProps = { listType: filterType }
      break

    case 'category':
      if (!categoryId) {
        return notFound()
      }
      const category = await categoryQueries.fetchById(categoryId)
      title = `Produkty w kategorii ${category.name}`
      productListProps = { listType: filterType, categoryId: categoryId }
      break

    case 'quicksearch':
      if (!searchString) {
        return notFound()
      }
      title = `Wyniki wyszukiwania dla '${searchString}'`
      productListProps = { listType: filterType, searchString: searchString }
      break

    default:
      return notFound()
  }

  return (
    <Container className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-3">
        <CategoryNavigation />
        {/* <ManufacturerNavigation
                groupName="Producent"
                groupValues={facets.manufacturer}
                selectedValues={manufacturerFilter.manufacturerId}
                onChange={(e) => onManufacturerChange('manufacturerId', e)}
              />
              <PriceNavigation
                selectedRanges={priceFilter.price}
                groupName="Cena"
                groupValues={facets.price}
                onChange={(e) => onPriceRangesChange('price', e)}
              /> */}
      </div>
      <div className="col-span-12 md:col-span-9">
        <h2 className="col-span-full text-2xl">{title}</h2>
        <ProductsList {...productListProps} />
      </div>
    </Container>
  )
}
