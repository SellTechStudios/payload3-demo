'use client'

import { Button } from '@/payload/blocks/Form/_ui/button'
import { useAuth } from '@/providers/Auth'
import React, { useEffect, useState } from 'react'

const ChangeNameSection: React.FC = () => {
  const { user, updateUser } = useAuth()
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setSurname(user.surname || '')
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return
    try {
      await updateUser({ name, surname })
      setMessage('Zaktualizowano!')
    } catch {
      setMessage('Błąd aktualizacji!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <h3 className="text-xl font-semibold">Zmień imię i nazwisko</h3>
      <div>
        <label className="block font-medium mb-1">Imię</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Nazwisko</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <Button type="submit" variant="default">
        Zapisz zmiany
      </Button>
      {message && <p className="mt-2">{message}</p>}
    </form>
  )
}

export default ChangeNameSection
