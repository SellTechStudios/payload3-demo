import { FacetBucket } from '@/db/products/queries.types'
import React from 'react'

type Props = {
  bucket: FacetBucket | undefined
}

const FacetBucketClient: React.FC<Props> = (props) => {
  const { bucket } = props

  if (!bucket) return null

  return (
    <>
      <h3>{bucket.label}</h3>

      {bucket.options.map((o) => (
        <label
          htmlFor={o.label}
          key={o.label}
          className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-gray-900"
        >
          <input
            id={o.label}
            type="checkbox"
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm pointer-events-none">
            {o.label} ({o.count})
          </span>
        </label>
      ))}
    </>
  )
}

export default FacetBucketClient
