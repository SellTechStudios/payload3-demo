'use client'

import FacetBucketClient from './FacetBucketClient'
import { FacetedNavigation } from '@/db/products/queries.types'

type Props = {
  facets: FacetedNavigation
}

export const FacetNavigationClient: React.FC<Props> = (props) => {
  const { facets } = props

  return (
    <nav className="prose">
      <FacetBucketClient bucket={facets.category} />
      <FacetBucketClient bucket={facets.price} />
      <FacetBucketClient bucket={facets.manufacturer} />
      <FacetBucketClient bucket={facets.bestseller} />
    </nav>
  )
}
