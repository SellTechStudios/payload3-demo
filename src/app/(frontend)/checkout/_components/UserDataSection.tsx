'use client'

import { useAuth } from '@/providers/Auth'
import React from 'react'

export const UserDataSection: React.FC = () => {
  const { user } = useAuth()

  if (!user) return null

  return (
    <section className="p-4 border border-gray-300 rounded-lg mb-6">
      <h4 className="text-lg font-semibold mb-2">Twoje Dane</h4>
      <div className="space-y-2">
        <div>
          <span className="font-medium">Imię i Nazwisko:</span> {user.name} {user.surname}
        </div>
        <div>
          <span className="font-medium">Telefon:</span> {user.phoneNumber || 'Brak danych'}
        </div>
        <div>
          <span className="font-medium">Email:</span> {user.email}
        </div>
      </div>
    </section>
  )
}
