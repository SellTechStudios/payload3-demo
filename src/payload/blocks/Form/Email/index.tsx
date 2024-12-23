import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import { Error } from '../Error'
import { Input } from '@/payload/blocks/Form/_ui/input'
import { Label } from '@/payload/blocks/Form/_ui/label'
import React from 'react'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required: requiredFromProps, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required: requiredFromProps })}
      />

      {requiredFromProps && errors[name] && <Error />}
    </Width>
  )
}
