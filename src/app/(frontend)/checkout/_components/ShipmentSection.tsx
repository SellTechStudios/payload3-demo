'use client'

import { cn } from '@/payload/utilities/cn'
import { useAuth } from '@/providers/Auth'
import { useEffect, useState } from 'react'
import { InpostGeowidget } from './InPostGeoWidget'

type Address = {
  zipCode: string
  city: string
  street: string
  houseNumber: string
  apartmentNumber?: string | null
}

export const ShipmentSection = () => {
  const [shipmentType, setShipmentType] = useState<'address' | 'inpost'>('address')
  const { user } = useAuth()
  const addresses: Address[] = user?.addresses || []
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0)
  const [selectedInpost, setSelectedInpost] = useState<string | null>(null)
  const [showInpostWidget, setShowInpostWidget] = useState(true)

  useEffect(() => {
    // Gdy zmienia się lista adresów, domyślnie wybieramy pierwszy
    if (addresses.length > 0) {
      setSelectedAddressIndex(0)
    }
  }, [addresses])

  const onShipmentLocationSelected = (location: any) => {
    const { name, address_details, location_description, opening_hours } = location
    const formattedAddress = address_details
      ? `${address_details.street} ${address_details.building_number}, ${address_details.city} (${address_details.post_code})`
      : ''
    const displayText = `<strong>${name}</strong> - ${formattedAddress}<br/>${location_description}<br/>Godziny: ${opening_hours}`
    setSelectedInpost(displayText)
    setShowInpostWidget(false)
  }

  return (
    <section className="p-4 border border-gray-300 rounded-lg">
      <h4 className="text-lg font-semibold mb-4">Dostawa</h4>

      {/* Wybór metody dostawy */}
      <div className="flex gap-4 mb-4">
        <button
          className={cn(
            `px-4 py-2 rounded ${shipmentType === 'address' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`,
          )}
          onClick={() => setShipmentType('address')}
        >
          Na adres
        </button>
        <button
          className={cn(
            `px-4 py-2 rounded ${shipmentType === 'inpost' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`,
          )}
          onClick={() => setShipmentType('inpost')}
        >
          Na paczkomat
        </button>
      </div>

      {/* Adres dostawy - wybór z select boxa */}
      {shipmentType === 'address' && (
        <div className="flex flex-col gap-2">
          {addresses.length > 0 ? (
            <>
              <label className="block font-medium text-gray-700">Wybierz adres:</label>
              <select
                className="border rounded p-2"
                value={selectedAddressIndex}
                onChange={(e) => setSelectedAddressIndex(Number(e.target.value))}
              >
                {addresses.map((address, index) => (
                  <option key={index} value={index}>
                    {address.street}, {address.city}
                  </option>
                ))}
              </select>
              <div className="text-gray-600 mt-2">
                <p>
                  <strong>Miasto:</strong> {addresses[selectedAddressIndex]?.city}
                </p>
                <p>
                  <strong>Kod pocztowy:</strong> {addresses[selectedAddressIndex]?.zipCode}
                </p>
                <p>
                  <strong>Ulica:</strong> {addresses[selectedAddressIndex]?.street}
                </p>
                <p>
                  <strong>Numer domu:</strong> {addresses[selectedAddressIndex]?.houseNumber}
                </p>
                {addresses[selectedAddressIndex]?.apartmentNumber && (
                  <p>
                    <strong>Numer mieszkania:</strong>{' '}
                    {addresses[selectedAddressIndex]?.apartmentNumber}
                  </p>
                )}
              </div>
            </>
          ) : (
            <p>Brak zapisanych adresów.</p>
          )}
        </div>
      )}

      {/* InPost - Wybór paczkomatu */}
      {shipmentType === 'inpost' && (
        <div className="mt-4">
          {showInpostWidget ? (
            <div className="h-96 [&>div]:h-96">
              <InpostGeowidget onPointAction={onShipmentLocationSelected} />
            </div>
          ) : (
            <>
              <div className="bg-green-100 p-2 rounded text-green-800 whitespace-pre-wrap">
                Wybrany paczkomat:
                <br />
                <div dangerouslySetInnerHTML={{ __html: selectedInpost || '' }} />
              </div>
              <button
                className="mt-2 btn btn-secondary"
                onClick={() => {
                  setShowInpostWidget(true)
                  setSelectedInpost(null)
                }}
              >
                Zmień paczkomat
              </button>
            </>
          )}
        </div>
      )}
    </section>
  )
}

export default ShipmentSection
