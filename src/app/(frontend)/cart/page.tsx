import { CartPage } from './page.client'
import { Container } from '@/components/Container'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Cart() {
  return (
    <div>
      <Container>
        <CartPage />
      </Container>
    </div>
  )
}
