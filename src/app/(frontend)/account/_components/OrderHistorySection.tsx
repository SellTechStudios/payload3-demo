'use client'

import React, { useEffect, useState } from 'react'

type Order = {
  id: string
  date: string
  total: number
}

const OrderHistorySection: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders/history', {
          method: 'GET',
          credentials: 'include',
        })
        const data = await res.json()
        setOrders(data.orders || [])
      } catch {
        console.error('Błąd przy pobieraniu historii zamówień')
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  if (loading) return <p>Ładowanie historii zamówień...</p>

  return (
    <div>
      <h3>Historia zamówień</h3>
      {orders.length === 0 ? (
        <p>Brak zamówień.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              Zamówienie #{order.id} - {order.date} - {order.total} zł
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default OrderHistorySection
