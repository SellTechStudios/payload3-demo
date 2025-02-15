import { getMeUser } from '@/utilities/getMeUser'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { Metadata } from 'next'
import LoginForm from './_components/LoginForm'

export default async function Login() {
  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  })

  return (
    <section className="flex flex-col items-center justify-center bg-center sm:bg-none sm:p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-xl p-12 bg-white rounded-lg shadow-lg sm:bg-opacity-90 sm:backdrop-blur-sm sm:p-8">
        <div className="flex items-center w-full gap-4 mb-4">
          <h3 className="m-0 text-2xl sm:text-3xl">Witaj</h3>
        </div>

        <LoginForm />
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login or create an account to get started.',
  openGraph: mergeOpenGraph({
    title: 'Login',
    url: '/login',
  }),
}
