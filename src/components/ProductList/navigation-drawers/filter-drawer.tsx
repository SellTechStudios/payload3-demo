'use client'

import { DialogDescription, DialogTitle } from '@/components/Dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader } from '@/components/Drawer'

import { Button } from '@/payload/blocks/Form/_ui/button'
import { ChevronDown } from 'lucide-react'
import ManufacturerNavigation from '../product-navigation/manufacturer-navigation'
import { PriceNavigation } from '../product-navigation/price-navigation'
import { PriceRange } from '../queries/fetchProducts'
import { useState } from 'react'

type FilterDrawerProps = {
  facets: any
  manufacturerFilters: string[]
  priceFilters: PriceRange[]
  onManufacturerChange: (key: string, value: string[]) => void
  onPriceRangesChange: (key: string, value: PriceRange[]) => void
}

export const FilterDrawer: React.FC<FilterDrawerProps> = (props: FilterDrawerProps) => {
  const { facets, manufacturerFilters, priceFilters, onManufacturerChange, onPriceRangesChange } =
    props
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setDrawerOpen(true)}>
        <ChevronDown className="mr-2" />
        Filtry
      </Button>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="max-h-screen">
          <DrawerHeader className="flex flex-col items-center">
            <DialogTitle>Filtry</DialogTitle>
            <DialogDescription>
              Wybierz filtry, aby zawęzić wyniki wyszukiwania produktów.
            </DialogDescription>
          </DrawerHeader>
          <div className="px-2 overflow-x-auto">
            <PriceNavigation
              groupName="Cena"
              groupValues={facets.price}
              selectedRanges={priceFilters}
              onChange={(e) => onPriceRangesChange('price', e)}
            />
            <ManufacturerNavigation
              groupName="Producent"
              groupValues={facets.manufacturer}
              selectedValues={manufacturerFilters}
              onChange={(e) => onManufacturerChange('manufacturerId', e)}
            />
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="ghost" aria-label="Close drawer">
                Zamknij
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
