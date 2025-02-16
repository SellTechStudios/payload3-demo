'use client'

import { User } from '@/payload-types'
import { Button } from '@/payload/blocks/Form/_ui/button'
import { useAuth } from '@/providers/Auth'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import AddressInput from './AddressInput'

type AddressFormValues = NonNullable<User['addresses']>[number]

const AddAddressForm: React.FC = () => {
  const { user, updateUser } = useAuth()
  const [message, setMessage] = React.useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>()

  const onSubmit: SubmitHandler<AddressFormValues> = async (data) => {
    if (!user) {
      return
    }

    const addressData = {
      ...data,
      apartmentNumber: data.apartmentNumber?.trim() === '' ? null : data.apartmentNumber,
    }

    const newAddresses = [...(user.addresses || []), addressData]

    try {
      await updateUser({ addresses: newAddresses })
      setMessage('Dodano adres!')
      reset()
    } catch (error) {
      console.error(error)
      alert('Błąd dodawania adresu!')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
      <h3 className="text-xl font-semibold">Dodaj adres</h3>

      <AddressInput
        label="Kod pocztowy"
        placeholder="00-000"
        error={errors.zipCode?.message}
        {...register('zipCode', { required: 'Kod pocztowy jest wymagany' })}
      />

      <AddressInput
        label="Miasto"
        placeholder="Miasto"
        error={errors.city?.message}
        {...register('city', { required: 'Miasto jest wymagane' })}
      />

      <AddressInput
        label="Ulica"
        placeholder="Ulica"
        error={errors.street?.message}
        {...register('street', { required: 'Ulica jest wymagana' })}
      />

      <AddressInput
        label="Numer domu"
        placeholder="Numer domu"
        error={errors.houseNumber?.message}
        {...register('houseNumber', { required: 'Numer domu jest wymagany' })}
      />

      <AddressInput
        label="Numer mieszkania (opcjonalnie)"
        placeholder="Numer mieszkania"
        error={errors.apartmentNumber?.message}
        {...register('apartmentNumber')}
      />

      <Button type="submit" className="btn btn-primary">
        Dodaj adres
      </Button>
      {message && <p className="mt-2 text-sm font-medium">{message}</p>}
    </form>
  )
}

export default AddAddressForm
