import React from 'react'

interface ReviewStarsProps {
  review: number // Review score ranging from 0 to 5
}

const ReviewStars: React.FC<ReviewStarsProps> = ({ review }) => {
  const stars = Array.from({ length: 5 }, (_, index) => index + 1)

  return (
    <div className="flex space-x-1">
      {stars.map((star) => (
        <svg
          key={star}
          xmlns="http://www.w3.org/2000/svg"
          fill={star <= review ? 'yellow' : 'gray'}
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17.27l5.18 3.73-1.64-6.81L20.9 9.27l-6.9-.59L12 2.5 9.99 8.68l-6.9.59 5.36 4.92-1.64 6.81L12 17.27z"
          />
        </svg>
      ))}
    </div>
  )
}

export default ReviewStars
