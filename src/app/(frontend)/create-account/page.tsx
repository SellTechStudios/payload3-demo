import { CreateAccountForm } from './_components/CreateAccountForm'

export default async function CreateAccount() {
  return (
    <section className="flex flex-col items-center justify-center bg-center sm:bg-none sm:p-4">
      <div className="flex flex-col items-center justify-center w-full max-w-xl p-12 bg-white rounded-lg shadow-lg sm:bg-opacity-90 sm:backdrop-blur-sm sm:p-8">
        <div className="flex items-center w-full gap-4 mb-4">
          <h3 className="m-0 text-2xl sm:text-3xl">Create an Account</h3>
        </div>

        <CreateAccountForm />
      </div>
    </section>
  )
}
