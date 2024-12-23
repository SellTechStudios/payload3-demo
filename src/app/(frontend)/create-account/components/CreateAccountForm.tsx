//CreateAccountForm
'use client'

import { initialValues, schema } from './CreateAccountForm.schema'

import { Button } from '@/components/FormElements/button'
import { Input } from '@/components/FormElements/input'
import React from 'react'
import { getRequiredFields } from '@/payload/utilities/yupUtils'
import { useAuth } from '@/providers/Auth'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'

export const CreateAccountForm: React.FC = () => {
  const { create, login } = useAuth()
  const router = useRouter()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      await create({
        email: values.email,
        password: values.password,
        passwordConfirm: values.repeatPassword,
      })

      await login({ email: values.email, password: values.password })

      router.push('/')
    },
  })

  const requiredFields = getRequiredFields(schema)
  const { errors, touched, values, handleChange, handleSubmit, isSubmitting } = formik

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-start w-full gap-6 mt-8 mb-4">
      <Input
        name="email"
        type="email"
        label="Email"
        required={requiredFields.includes('email')}
        value={values.email}
        error={errors.email}
        touched={touched.email}
        onChange={handleChange}
      />

      <Input
        name="password"
        type="password"
        label="Password"
        required={requiredFields.includes('password')}
        value={values.password}
        error={errors.password}
        touched={touched.password}
        onChange={handleChange}
      />

      <Input
        name="passwordConfirm"
        type="password"
        label="Confirm Password"
        required={requiredFields.includes('repeatPassword')}
        value={values.repeatPassword}
        error={errors.repeatPassword}
        touched={touched.repeatPassword}
        onChange={handleChange}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Processing' : 'Create Account'}
      </Button>
    </form>
  )
}
