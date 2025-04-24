'use client'

import { Button } from '@/components/FormElements/button'
import { Input } from '@/components/FormElements/input'
import { useAuth } from '@/providers/Auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
  .object({
    password: z.string().min(6, 'Hasło musi mieć co najmniej 6 znaków'),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: 'Hasła muszą być identyczne',
    path: ['passwordConfirm'],
  })

type FormData = z.infer<typeof schema>

const ChangePasswordSection = () => {
  const { changePassword } = useAuth()
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setSuccessMessage('')
    try {
      await changePassword({
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      })
      reset()
      setSuccessMessage('Hasło zostało pomyślnie zmienione.')
    } catch (err) {
      setError('password', { message: err.message })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-start w-full gap-6 mt-8 mb-4 max-w-md"
    >
      <Input
        type="password"
        label="Nowe hasło"
        required
        {...register('password')}
        error={errors.password?.message}
      />

      <Input
        type="password"
        label="Potwierdź hasło"
        required
        {...register('passwordConfirm')}
        error={errors.passwordConfirm?.message}
      />

      {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Przetwarzanie...' : 'Zmień hasło'}
      </Button>
    </form>
  )
}

export default ChangePasswordSection
