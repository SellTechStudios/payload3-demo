'use client'

import { Button } from '@/payload/blocks/Form/_ui/button'
import { useAuth } from '@/providers/Auth'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

type PhoneFormValues = {
  phoneNumber: string
}

const ChangePhoneNumberSection: React.FC = () => {
  const { user, updateUser } = useAuth()
  const [message, setMessage] = useState<string>('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PhoneFormValues>()

  useEffect(() => {
    if (user?.phoneNumber) {
      reset({ phoneNumber: user.phoneNumber })
    }
  }, [user, reset])

  const onSubmit: SubmitHandler<PhoneFormValues> = async (data) => {
    try {
      await updateUser({ phoneNumber: data.phoneNumber })
      setMessage('Zaktualizowano numer telefonu!')
      reset({ phoneNumber: data.phoneNumber })
    } catch (error) {
      console.error(error)
      alert('Błąd aktualizacji numeru telefonu!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <h3 className="text-xl font-semibold">Zmień numer telefonu</h3>
      <div>
        <label className="block mb-1 font-medium">Numer telefonu</label>
        <input type="tel" {...register('phoneNumber')} className="border rounded p-2 w-full" />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
        )}
      </div>
      <Button type="submit" variant="default">
        Zapisz numer
      </Button>
      {message && <p className="mt-2 text-sm font-medium">{message}</p>}
    </form>
  )
}

export default ChangePhoneNumberSection
