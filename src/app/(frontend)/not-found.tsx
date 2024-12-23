import { Button } from '@/payload/blocks/Form/_ui/button'

export default function NotFound() {
  return (
    <div className="container py-28">
      <div className="prose max-w-none">
        <h1 style={{ marginBottom: 0 }}>404</h1>
        <h3>Ups! Coś poszło nie tak... 😕</h3>
        <p className="mb-4">
          Wygląda na to, że trafiłeś na stronę, której nie ma. Może to nasza wina, a może wpisany
          adres był zły. Ale nie martw się, pomożemy Ci wrócić na właściwy tor!
        </p>
      </div>
      <Button href="/">Wróć na strone główną</Button>
    </div>
  )
}
