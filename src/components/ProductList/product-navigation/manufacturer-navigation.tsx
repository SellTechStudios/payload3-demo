'use client'

import { Checkbox } from '@/payload/blocks/Form/_ui/checkbox'

type ManufacturerProps = {
  groupName: string
  groupValues: {
    id: string
    name: string
    count: number
  }[]
  selectedValues: string[]
  onChange: (e: string[]) => void
}

export default function ManufacturerNavigation(props: ManufacturerProps) {
  const { groupName, groupValues, selectedValues, onChange } = props
  // Track local state
  const onCheckChange = (id: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, id])
    } else {
      onChange(selectedValues.filter((v) => v !== id))
    }
  }

  return groupValues?.length ? (
    <>
      <h3 className="text-lg font-bold mb-2 mt-4">{groupName}</h3>
      <ul className="space-y-2 inline-block">
        {groupValues?.map((facet) => (
          <li key={facet.id}>
            <label className="flex items-center space-x-2">
              <Checkbox
                id={facet.id}
                checked={selectedValues?.includes(facet.id)}
                onCheckedChange={(checked) => onCheckChange(facet.id, checked as boolean)}
              />
              <span>
                {facet.name} ({facet.count})
              </span>
            </label>
          </li>
        ))}
      </ul>
    </>
  ) : null
}
