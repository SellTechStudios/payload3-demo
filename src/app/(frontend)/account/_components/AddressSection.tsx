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
  const { user } = useAuth()
  const [addresses, setAddresses] = useState<Address[]>(user?.addresses || [])

  useEffect(() => {
    setAddresses(user?.addresses || [])
  }, [user])

  return (
    <div>
      <h2>Twoje adresy</h2>
      <AddAddressForm />
      {addresses.length > 0 ? (
        <div className="mt-4">
          {addresses.map((address, index) => (
            <div key={index} className="border p-4 rounded mb-2">
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
          ))}
        </div>
      ) : (
        <p>Brak zapisanych adresów.</p>
      )}
    </div>
  )
}

export default AddressesSection
