'use client'

import { Button } from '@/payload/blocks/Form/_ui/button'
import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import AddressesSection from './_components/AddressSection'
import ChangeNameSection from './_components/ChangeNameSection'
import ChangePasswordSection from './_components/ChangePasswordSection'
import ChangePhoneNumberSection from './_components/ChangePhoneNumberSection'
import OrderHistorySection from './_components/OrderHistorySection'

const AccountPage = () => {
  const { logout, user } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<
    'profile' | 'password' | 'phone' | 'orders' | 'addresses' | 'name'
  >('profile')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await logout()
      router.push('/login')
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoggingOut(false)
    }
  }
  return (
    <>
      <div className="mb-4">
        <Button variant="secondary" onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Wylogowywanie...' : 'Logout'}
        </Button>
      </div>

      <div className="hidden md:flex md:flex-wrap gap-4 mb-8">
        <Button
          onClick={() => setActiveTab('profile')}
          variant={activeTab === 'profile' ? 'default' : 'secondary'}
        >
          Profil
        </Button>
        <Button
          onClick={() => setActiveTab('name')}
          variant={activeTab === 'name' ? 'default' : 'secondary'}
        >
          Imię i nazwisko
        </Button>
        <Button
          onClick={() => setActiveTab('password')}
          variant={activeTab === 'password' ? 'default' : 'secondary'}
        >
          Zmień hasło
        </Button>
        <Button
          onClick={() => setActiveTab('phone')}
          variant={activeTab === 'phone' ? 'default' : 'secondary'}
        >
          Zmień numer telefonu
        </Button>
        <Button
          onClick={() => setActiveTab('addresses')}
          variant={activeTab === 'addresses' ? 'default' : 'secondary'}
        >
          Adresy
        </Button>
        <Button
          onClick={() => setActiveTab('orders')}
          variant={activeTab === 'orders' ? 'default' : 'secondary'}
        >
          Historia zamówień
        </Button>
      </div>

      <div className="md:hidden block mb-4 md:mb-8">
        <select
          value={activeTab}
          onChange={(e) =>
            setActiveTab(
              e.target.value as 'profile' | 'password' | 'phone' | 'orders' | 'addresses' | 'name',
            )
          }
          className="p-2 border rounded w-full"
        >
          <option value="profile">Profil</option>
          <option value="name">Imię i nazwisko</option>
          <option value="password">Zmień hasło</option>
          <option value="phone">Zmień numer telefonu</option>
          <option value="addresses">Adresy</option>
          <option value="orders">Historia zamówień</option>
        </select>
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
            <p>
              <strong>Nazwisko:</strong> {user?.surname}
            </p>
          </div>
        )}
        {activeTab === 'name' && <ChangeNameSection />}
        {activeTab === 'password' && <ChangePasswordSection />}
        {activeTab === 'phone' && <ChangePhoneNumberSection />}
        {activeTab === 'orders' && <OrderHistorySection />}
        {activeTab === 'addresses' && <AddressesSection />}
      </div>
    </>
  )
}

export default AccountPage
