import { CategoryNavigation } from '@/app/(frontend)/products/_components/category-nav/Component'

export default async function ProductListsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <div className="hidden md:flex flex-col">
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
      </div>
      <div className="md:col-span-3">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">{children}</div>
      </div>
    </div>
  )
}
