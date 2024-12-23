import clsx from 'clsx'
import React from 'react'

export const Message: React.FC<{
  message?: React.ReactNode
  error?: React.ReactNode
  success?: React.ReactNode
  warning?: React.ReactNode
  className?: string
}> = ({ message, error, success, warning, className }) => {
  const messageToRender = message || error || success || warning

  if (messageToRender) {
    return (
      <div
        className={clsx(
          'p-4 w-full text-sm rounded-md',
          className,
          error && 'bg-red-500 text-white',
          success && 'bg-green-500 text-white',
          warning && 'bg-yellow-500 text-black',
          !error && !success && !warning && 'bg-gray-100 text-black',
        )}
      >
        {messageToRender}
      </div>
    )
  }
  return null
}
