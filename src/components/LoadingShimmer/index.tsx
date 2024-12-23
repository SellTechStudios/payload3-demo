import React from 'react'
import clsx from 'clsx'

export const LoadingShimmer: React.FC<{
  number?: number
  height?: number // in `base` units
}> = ({ number = 1, height = 10 }) => {
  const arrayFromNumber = Array.from(Array(number).keys())

  return (
    <div className="space-y-4">
      {arrayFromNumber.map((_, index) => (
        <div
          key={index}
          className={clsx('w-full bg-gray-200 rounded-md animate-pulse', `h-${height}`)}
        />
      ))}
    </div>
  )
}
