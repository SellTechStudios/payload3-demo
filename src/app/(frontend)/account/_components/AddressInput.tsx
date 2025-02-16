'use client'

import React from 'react'

type AddressInputProps = {
  label: string
  error?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const AddressInput: React.FC<AddressInputProps> = ({
  label,
  error,
  type = 'text',
  placeholder,
  required = false,
  ...rest
}) => {
  return (
    <div>
      <label className="block mb-1 font-semibold">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className={`border rounded p-2 w-full ${
          error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'
        }`}
        {...rest}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}

export default AddressInput
