import { SearchIcon } from 'lucide-react'

export const HeaderSearch = () => {
  return (
    <form
      action={'/products/quicksearch'}
      className="relative w-full max-w-[300px] hidden md:block"
    >
      <input
        type="text"
        name="searchString"
        placeholder="Search..."
        className="border w-full border-gray-300 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none"
      />
      <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <SearchIcon className="w-5 text-gray-500" />
      </button>
    </form>
  )
}
