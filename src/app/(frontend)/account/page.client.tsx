'use client'

import { useAuth } from '@/providers/Auth'

import { Button } from '@/payload/blocks/Form/_ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AddressesSection from './_components/AddressSection'
import ChangeEmailSection from './_components/ChangeEmailSection'
import ChangePasswordSection from './_components/ChangePasswordSection'
import OrderHistorySection from './_components/OrderHistorySection'

const AccountPageClient = () => {
  const { logout, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<
    'profile' | 'password' | 'email' | 'orders' | 'addresses'
  >('profile')

  return (
    <>
      <div className="mb-4">
        <Button
          variant="secondary"
          onClick={() => {
            logout()
            router.push('/login')
          }}
        >
          Logout
        </Button>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab('profile')}
          className={`btn ${activeTab === 'profile' && 'btn-active'}`}
        >
          Profil
        </button>
        <button
          onClick={() => setActiveTab('password')}
          className={`btn ${activeTab === 'password' && 'btn-active'}`}
        >
          Zmień hasło
        </button>
        <button
          onClick={() => setActiveTab('email')}
          className={`btn ${activeTab === 'email' && 'btn-active'}`}
        >
          Zmień email
        </button>
        <button
          onClick={() => setActiveTab('addresses')}
          className={`btn ${activeTab === 'addresses' && 'btn-active'}`}
        >
          Adresy
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`btn ${activeTab === 'orders' && 'btn-active'}`}
        >
          Historia zamówień
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'profile' && (
          <div>
            <h2>Informacje o koncie</h2>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Nazwa:</strong> {user?.name}
            </p>
          </div>
        )}
        {activeTab === 'password' && <ChangePasswordSection />}
        {activeTab === 'email' && <ChangeEmailSection />}
        {activeTab === 'orders' && <OrderHistorySection />}
        {activeTab === 'addresses' && <AddressesSection />}
      </div>
    </>
  )
}

export default AccountPageClient
