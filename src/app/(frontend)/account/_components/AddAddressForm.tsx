// components/AddAddressForm.tsx
'use client'

import { Button } from '@/payload/blocks/Form/_ui/button'
import { useAuth } from '@/providers/Auth'
import React, { useState } from 'react'
import AddressInput from './AddressInput'

const AddAddressForm: React.FC = () => {
  const { user, setUser } = useAuth()
  const [zipCode, setZipCode] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [houseNumber, setHouseNumber] = useState('')
  const [apartmentNumber, setApartmentNumber] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setMessage('Nie jesteś zalogowany.')
      return
    }

    const addressData = {
      zipCode,
      city,
      street,
      houseNumber,
      apartmentNumber: apartmentNumber || null,
    }

    const newAddresses = [...(user.addresses || []), addressData]

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ addresses: newAddresses }),
      })

      if (res.ok) {
        const data = await res.json()
        setUser(data.doc)
        setMessage('Adres został dodany.')
        setZipCode('')
        setCity('')
        setStreet('')
        setHouseNumber('')
        setApartmentNumber('')
      } else {
        setMessage('Błąd przy dodawaniu adresu.')
      }
    } catch (error) {
      console.error(error)
      setMessage('Błąd sieci.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <h3>Dodaj adres</h3>
      <AddressInput
        label="Kod pocztowy"
        placeholder="00-000"
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        required
      />
      <AddressInput
        label="Miasto"
        placeholder="Miasto"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
      />
      <AddressInput
        label="Ulica"
        placeholder="Ulica"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        required
      />
      <AddressInput
        label="Numer domu"
        placeholder="Numer domu"
        value={houseNumber}
        onChange={(e) => setHouseNumber(e.target.value)}
        required
      />
      <AddressInput
        label="Numer mieszkania (opcjonalnie)"
        placeholder="Numer mieszkania"
        value={apartmentNumber}
        onChange={(e) => setApartmentNumber(e.target.value)}
      />
      <Button type="submit" className="btn btn-primary">
        Dodaj adres
      </Button>
      {message && <p>{message}</p>}
    </form>
  )
}

export default AddAddressForm
