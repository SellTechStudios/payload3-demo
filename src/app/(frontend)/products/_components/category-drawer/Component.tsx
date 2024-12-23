'use client'

import { DialogDescription, DialogTitle } from '@/components/Dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader } from '@/components/Drawer'

import { Button } from '@/payload/blocks/Form/_ui/button'
import { CategoryNavigation } from './Component'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

export const CategoryDrawer: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setDrawerOpen(true)}>
        <ChevronDown className="mr-2" />
        Kategorie
      </Button>
      <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerContent className="max-h-screen">
          <DrawerHeader className="flex items-center flex-col">
            <DialogTitle>Kategorie</DialogTitle>
            <DialogDescription>Wybierz kategorię, aby przeglądać produkty.</DialogDescription>
          </DrawerHeader>
          <div className="px-4 overflow-x-auto">
            <CategoryNavigation className="flex" />
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
