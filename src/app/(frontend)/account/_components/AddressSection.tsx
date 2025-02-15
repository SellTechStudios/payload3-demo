'use client'

import { useAuth } from '@/providers/Auth'
import React, { useEffect, useState } from 'react'
import AddAddressForm from './AddAddressForm'

type Address = {
  zipCode: string
  city: string
  street: string
  houseNumber: string
  apartmentNumber?: string | null
}

const AddressesSection: React.FC = () => {
  const { user, setUser } = useAuth()
  const [addresses, setAddresses] = useState<Address[]>(user?.addresses || [])

  useEffect(() => {
    setAddresses(user?.addresses || [])
  }, [user])

  const handleRemoveAddress = async (index: number) => {
    if (!user) return

    const newAddresses = addresses.filter((_, i) => i !== index)

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
        setAddresses(newAddresses)
      } else {
        console.error('Błąd przy aktualizacji adresów')
      }
    } catch (error) {
      console.error('Błąd sieci:', error)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Twoje adresy</h2>
      <AddAddressForm />
      {addresses.length > 0 ? (
        <div className="mt-4 space-y-4">
          {addresses.map((address, index) => (
            <div key={index} className="border p-4 rounded flex justify-between items-center">
              <div>
                <p>
                  <strong>Kod pocztowy:</strong> {address.zipCode}
                </p>
                <p>
                  <strong>Miasto:</strong> {address.city}
                </p>
                <p>
                  <strong>Ulica:</strong> {address.street}
                </p>
                <p>
                  <strong>Numer domu:</strong> {address.houseNumber}
                </p>
                {address.apartmentNumber && (
                  <p>
                    <strong>Numer mieszkania:</strong> {address.apartmentNumber}
                  </p>
                )}
              </div>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                onClick={() => handleRemoveAddress(index)}
              >
                Usuń
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Brak zapisanych adresów.</p>
      )}
    </div>
  )
}

export default AddressesSection
