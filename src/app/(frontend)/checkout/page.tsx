import { Container } from '@/components/Container'
import { getMeUser } from '@/utilities/getMeUser'
import { CartSummary } from './_components/CartSummary'
import { PaymentSection } from './_components/PaymentSection'
import { ShipmentSection } from './_components/ShipmentSection'

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
      <div className="flex flex-row gap-8">
        <div className="flex flex-1 flex-col gap-20">
          <ShipmentSection />
          <PaymentSection />
        </div>
        <CartSummary />
      </div>
    </Container>
  )
}
