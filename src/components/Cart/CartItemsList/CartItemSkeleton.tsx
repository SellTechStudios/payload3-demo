'use client'

export const CartItemSkeleton = () => {
  return (
    <li className="flex items-center gap-4 py-4 animate-pulse">
      <div className="w-[80px] h-[80px] bg-gray-200 rounded" />
      <div className="flex-1 space-y-2">
        <div className="w-3/4 h-4 bg-gray-200 rounded" />
        <div className="w-1/2 h-4 bg-gray-200 rounded" />
      </div>
      <div className="w-16 h-6 bg-gray-200 rounded" />
      <div className="w-16 h-6 bg-gray-200 rounded" />
      <div className="w-6 h-6 bg-gray-200 rounded" />
    </li>
  )
}
