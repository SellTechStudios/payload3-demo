import React from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/payload/utilities/cn'

export type ReviewStarsProps = {
  rating: ('1' | '2' | '3' | '4' | '5') | null | undefined
  className?: string
}

const ReviewStars: React.FC<ReviewStarsProps> = (props: ReviewStarsProps) => {
  return (
    <div className="flex flex-row gap-1 justify-start flex-1">
      {Array.from({ length: 5 }, (_, index) => {
        const star = index + 1
        return (
          <Star
            className={cn(
              star <= (props.rating ? parseInt(props.rating) : 0)
                ? 'fill-yellow-500 stroke-yellow-500'
                : 'fill-white stroke-gray-300 stroke-2',
              props.className,
            )}
            key={star}
            size={20}
          />
        )
      })}
    </div>
  )
}

export default ReviewStars
