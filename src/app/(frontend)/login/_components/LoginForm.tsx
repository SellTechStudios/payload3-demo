'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useRef } from 'react'
import { initialValues, schema } from './LoginForm.schema'

import { Button } from '@/components/FormElements/button'
import { Input } from '@/components/FormElements/input'
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'

const LoginForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const redirect = useRef(searchParams.get('redirect'))
  const { login } = useAuth()
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
      await login({
        email: values.email,
        password: values.password,
      })

      router.push(redirect.current || '/')
    } catch (err) {
      setError('root', { message: err.message || 'Coś poszło nie tak' })
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

      {errors.root?.message && <div className="text-sm text-red-500">{errors.root.message}</div>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Processing...' : 'Login'}
      </Button>

      <div className="flex items-center justify-between w-full text-sm">
        <Link href="/create-account">Utwórz konto</Link>
        <Link href={`/recover-password${allParams}`}>Przywróć hasło</Link>
      </div>
    </form>
  )
}

export default LoginForm
