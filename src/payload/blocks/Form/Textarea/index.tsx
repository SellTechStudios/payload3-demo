import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Error } from '../Error'
import { Label } from '@/payload/blocks/Form/_ui/label'
import React from 'react'
import { Textarea as TextAreaComponent } from '@/payload/blocks/Form/_ui/textarea'
import type { TextField } from '@payloadcms/plugin-form-builder/types'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required: requiredFromProps,
  rows = 3,
  width,
}) => {
  return (
    <Width width={width}>
      <Label htmlFor={name}>{label}</Label>

      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        {...register(name, { required: requiredFromProps })}
      />

      {requiredFromProps && errors[name] && <Error />}
    </Width>
  )
}
