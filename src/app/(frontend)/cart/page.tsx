import { Container } from '@/components/Container'
import { CartPage } from './page.client'

export const dynamic = 'force-dynamic'

export default async function Cart() {
  return (
    <Container>
      <CartPage />
    </Container>
  )
}
