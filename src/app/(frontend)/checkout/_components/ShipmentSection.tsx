// ShipmentSection.tsx
'use client'

import { cn } from '@/payload/utilities/cn'
import { useAuth } from '@/providers/Auth'
import { useState } from 'react'
import { InpostGeowidget } from './InPostGeoWidget'

export const ShipmentSection = () => {
  const [shipmentType, setShipmentType] = useState<'address' | 'inpost'>('address')
  const { user } = useAuth()
  const addresses = user?.addresses || []
  const [selectedInpost, setSelectedInpost] = useState<string | null>(null)
  const [showInpostWidget, setShowInpostWidget] = useState(true)

  const onShipmentLocationSelected = (location) => {
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

      {shipmentType === 'address' && (
        <div className="flex flex-col gap-2">
          <div className="text-gray-600">
            Szczegóły:
            <p>Miasto: {addresses?.[0]?.city}</p>
            <p>Kod pocztowy: {addresses?.[0]?.zipCode}</p>
            <p>Ulica: {addresses?.[0]?.street}</p>
            <p>Numer domu: {addresses?.[0]?.houseNumber}</p>
            <p>Numer mieszkania: {addresses?.[0]?.apartmentNumber}</p>
          </div>
        </div>
      )}

      {shipmentType === 'inpost' && (
        <div className="mt-4">
          {showInpostWidget ? (
            <div className="h-96 [&>div]:h-96">
              <InpostGeowidget onPointAction={onShipmentLocationSelected} />
            </div>
          ) : (
            <>
              <div className="bg-green-100 p-2 rounded text-green-800">
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
