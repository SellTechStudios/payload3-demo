import { cn } from '@/utilities/cn'
import React, { forwardRef, Ref } from 'react'

type Props = {
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

export const Container: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { className, children } = props

  return (
    <div ref={ref} className={cn('container mx-auto px-4 md:px-4 lg:px-8', className)}>
      {children}
    </div>
  )
})

Container.displayName = 'Container'
