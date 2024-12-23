'use client'

import { Button } from '@/payload/blocks/Form/_ui/button'
import { Container } from '@/components/Container'
import React from 'react'
import { useAuth } from '@/providers/Auth'
import { useRouter } from 'next/navigation'

const AccountPage: React.FC = () => {
  const { logout } = useAuth()
  const router = useRouter()

  return (
    <Container>
      <Button
        className="mt-3"
        variant="secondary"
        onClick={() => {
          logout()
          router.push('/login')
        }}
      >
        Logout
      </Button>
    </Container>
  )
}

export default AccountPage
