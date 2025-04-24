import { cn } from '@/payload/utilities/cn'
import React, { forwardRef } from 'react'
import { Label } from './label'

type Props = {
  name: string
  label: string
  error?: string
  type?: 'text' | 'number' | 'password' | 'email'
  required?: boolean
  disabled?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, label, error, type = 'text', required = false, disabled = false, ...rest }, ref) => {
    return (
      <div className="w-full">
        <Label htmlFor={name} className="mb-2 text-xs leading-none">
          {label}
          {required && <span className="text-red-500">&nbsp;*</span>}
        </Label>
        <input
          id={name}
          ref={ref}
          name={name}
          type={type}
          disabled={disabled}
          className={cn(
            'flex h-10 w-full rounded border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500 bg-red-100',
          )}
          {...rest}
        />

        {error && <div className="text-sm leading-tight mt-1 text-red-500">{error}</div>}
      </div>
    )
  },
)

Input.displayName = 'Input'
