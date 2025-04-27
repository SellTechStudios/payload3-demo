'use client'

import { FacetedNavigation } from '@/db/products/queries.types'
import { X } from 'lucide-react'
import { FacetNavigationClient } from '../facet-navigation/FacetNavigation.Client'

type FiltersModalProps = {
  isOpen: boolean
  onCloseAction: () => void
  facets: FacetedNavigation
}
export const FiltersModal = ({ isOpen, onCloseAction, facets }: FiltersModalProps) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={onCloseAction} className="text-gray-500 hover:text-gray-800 p-2">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        <FacetNavigationClient facets={facets} />
      </div>
    </div>
  )
}
