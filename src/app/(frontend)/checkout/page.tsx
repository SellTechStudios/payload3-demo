import { Container } from '@/components/Container'
import { getMeUser } from '@/utilities/getMeUser'
import { CheckoutContent } from './_components/CheckoutContent'

// Force this page to be dynamic so that Next.js does not cache it
// See the note in '../[slug]/page.tsx' about this
export const dynamic = 'force-dynamic'

export default async function Checkout() {
  await getMeUser({
    nullUserRedirect: `/login?error=${encodeURIComponent(
      'You must be logged in to checkout.',
    )}&redirect=${encodeURIComponent('/checkout')}`,
  })

  return (
    <Container>
      <CheckoutContent />
    </Container>
  )
}
