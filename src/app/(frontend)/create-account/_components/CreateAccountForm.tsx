'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { initialValues, schema } from './CreateAccountForm.schema'

import { Button } from '@/components/FormElements/button'
import { Input } from '@/components/FormElements/input'
import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

export const CreateAccountForm: React.FC = () => {
  const { create, login } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(schema),
  })

  const onSubmit = async (values: typeof initialValues) => {
    try {
      await create({
        email: values.email,
        password: values.password,
        passwordConfirm: values.repeatPassword,
      })

      await login({ email: values.email, password: values.password })

      router.push('/')
    } catch (err) {
      setError('root', {
        message: err.message || 'Something went wrong. Please try again.',
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start w-full gap-6 mt-8 mb-4"
    >
      <Input
        type="email"
        label="Email"
        required
        {...register('email')}
        error={errors.email?.message}
      />

      <Input
        type="password"
        label="Password"
        required
        {...register('password')}
        error={errors.password?.message}
      />

      <Input
        type="password"
        label="Confirm Password"
        required
        {...register('repeatPassword')}
        error={errors.repeatPassword?.message}
      />

      {errors.root?.message && <div className="text-sm text-red-500">{errors.root.message}</div>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Processing...' : 'Create Account'}
      </Button>
    </form>
  )
}
