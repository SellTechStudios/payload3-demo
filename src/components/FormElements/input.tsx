import { Label } from './label'
import React from 'react'
import { cn } from '@/payload/utilities/cn'

type Props = {
  name: string
  label: string
  error?: string
  type?: 'text' | 'number' | 'password' | 'email'
  value: string
  required?: boolean
  disabled?: boolean
  touched?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input: React.FC<Props> = ({
  name,
  label,
  error,
  value,
  type = 'text',
  required = false,
  disabled = false,
  touched = false,
  onChange,
}) => {
  return (
    <div className="w-full">
      <Label htmlFor={name} className="mb-2 text-xs leading-none">
        {label}
        {required && <span className="text-red-500">&nbsp;*</span>}
      </Label>
      <input
        value={value}
        type={type}
        name={name}
        className={cn(
          'flex h-10 w-full rounded border border-border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-500 bg-red-100',
        )}
        disabled={disabled}
        onChange={onChange}
      />

      {/* Error message */}
      {touched && error && <div className="text-sm leading-tight mt-1 text-red-500">{error}</div>}
    </div>
  )
}
