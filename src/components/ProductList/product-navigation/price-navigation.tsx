'use client'

import { Checkbox } from '@/payload/blocks/Form/_ui/checkbox'
import { PriceRange } from '../queries/fetchProducts'

type FacetProps = {
  groupName: string
  groupValues: {
    _id: string
    lowerBound: number
    upperBound: number
    count: number
  }[]
  selectedRanges: PriceRange[]
  onChange: (e: PriceRange[]) => void
}

export const PriceNavigation = (props: FacetProps) => {
  const { groupName, groupValues, onChange, selectedRanges } = props

  const onCheckChange = (id: string, checked: boolean, lowerBound: number, upperBound: number) => {
    if (checked) {
      onChange([...selectedRanges, { id, lowerBound, upperBound }])
    } else {
      onChange(selectedRanges.filter((range) => range.id !== id))
    }
  }

  return groupValues?.length ? (
    <>
      <h3 className="text-lg font-bold mb-2 mt-4">{groupName}</h3>
      <ul className="space-y-2 inline-block">
        {groupValues?.map((facet) => (
          <li key={facet._id}>
            <label className="flex items-center space-x-2">
              <Checkbox
                id={facet._id}
                checked={selectedRanges?.some((range) => range.id === facet._id)}
                onCheckedChange={(checked) =>
                  onCheckChange(facet._id, checked as boolean, facet.lowerBound, facet.upperBound)
                }
              />
              <span>
                {facet.lowerBound} - {facet.upperBound} ({facet.count})
              </span>
            </label>
          </li>
        ))}
      </ul>
    </>
  ) : null
}
