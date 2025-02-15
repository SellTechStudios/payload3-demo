'use client'

import { useAuth } from '@/providers/Auth'
import React, { useEffect, useState } from 'react'

const ChangePhoneNumberSection: React.FC = () => {
  const { user, setUser } = useAuth()
  const [phoneNumber, setPhoneNumber] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user?.phoneNumber) {
      setPhoneNumber(user.phoneNumber)
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      const res = await fetch(`/api/users/${user.id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      })

      if (res.ok) {
        const data = await res.json()
        setUser(data.doc)
        setMessage('Numer telefonu został zaktualizowany.')
      } else {
        setMessage('Błąd przy aktualizacji numeru telefonu.')
      }
    } catch (error) {
      console.error(error)
      setMessage('Błąd sieci.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <h3 className="text-xl font-semibold">Zmień numer telefonu</h3>
      <div>
        <label className="block mb-1 font-medium">Numer telefonu</label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Zapisz numer
      </button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  )
}

export default ChangePhoneNumberSection
