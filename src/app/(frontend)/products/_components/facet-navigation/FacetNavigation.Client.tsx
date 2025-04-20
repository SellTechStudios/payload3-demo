'use client'

import FacetBucketClient from './FacetBucketClient'
import { FacetedNavigation } from '@/db/products/queries.types'

type Props = {
  facets: FacetedNavigation
}

export const FacetNavigationClient: React.FC<Props> = (props) => {
  const { facets } = props

  function handleOptionClick(
    bucket: string,
    option: { bucketCode: string; optionValue: string | number | boolean; isChecked: boolean },
  ): void {
    console.log('Facet option clicked:', bucket, option)
    // Implement the logic to handle the option click here
  }

  return (
    <nav className="prose">
      <FacetBucketClient
        bucket={facets.category}
        onOptionClick={(option) => handleOptionClick('category', option)}
      />
      <FacetBucketClient
        bucket={facets.price}
        onOptionClick={(option) => handleOptionClick('price', option)}
      />
      <FacetBucketClient
        bucket={facets.manufacturer}
        onOptionClick={(option) => handleOptionClick('manufacturer', option)}
      />
    </nav>
  )
}
