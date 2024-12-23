'use client'

import React, { useRef } from 'react'
import { initialValues, schema } from './LoginForm.schema'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '@/components/FormElements/button'
import { Input } from '@/components/FormElements/input'
import Link from 'next/link'
import { getRequiredFields } from '@/payload/utilities/yupUtils'
import { useAuth } from '@/providers/Auth'
import { useFormik } from 'formik'

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
  const router = useRouter()

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      await login({
        email: values.email,
        password: values.password,
      })
      if (redirect?.current) router.push(redirect.current as string)
      else router.push('/')
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

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Processing' : 'Login'}
      </Button>

      <div className="flex items-center justify-between w-full">
        <Link href="/create-account">Utwórz konto</Link>
        <br />
        <Link href={`/recover-password${allParams}`}>Przywróć hasło</Link>
      </div>
    </form>
  )
}

export default LoginForm
