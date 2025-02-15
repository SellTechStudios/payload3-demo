'use client'

import { useAuth } from '@/providers/Auth'
import React, { useState } from 'react'

const ChangePasswordSection = () => {
  const { resetPassword, token } = useAuth()
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [message, setMessage] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    resetPassword({
      password,
      passwordConfirm,
      token: token!,
    })
      .then(() => {
        setPassword('')
        setPasswordConfirm('')
        setMessage('Hasło zostało zmienione.')
      })
      .catch((error) => {
        setMessage('Błąd przy zmianie hasła.')
      })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <h3>Zmień hasło</h3>
      <div>
        <label>Nowe hasło</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label>Potwierdź nowe hasło</label>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          required
          className="border rounded p-2 w-full"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Zmień hasło
      </button>
      {message && <p>{message}</p>}
    </form>
  )
}

export default ChangePasswordSection
