'use client'

import React, { useState } from 'react'

const ChangeEmailSection: React.FC = () => {
  const [newEmail, setNewEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/users/change-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail }),
      })
      if (res.ok) {
        setMessage('Email został zmieniony.')
      } else {
        setMessage('Błąd przy zmianie emaila.')
      }
    } catch (error) {
      setMessage('Błąd sieci.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <h3>Zmień email</h3>
      <div>
        <label>Nowy email</label>
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Zmień email
      </button>
      {message && <p>{message}</p>}
    </form>
  )
}

export default ChangeEmailSection
