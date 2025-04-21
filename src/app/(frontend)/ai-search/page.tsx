'use client'

import React, { useTransition } from 'react'

import { Container } from '@/components/Container'
import { LoadingShimmer } from '@/components/LoadingShimmer'
import { ProductCard } from '@/components/Product/Card/ProductCard'
import { ProductItem } from '@/db/products/queries.types'
import { SearchIcon } from 'lucide-react'
import { executeVectorSearch } from './actions'

export default function Page() {
  const [isPending, startTransition] = useTransition()
  const [searchResults, setSearchResults] = React.useState<ProductItem[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.currentTarget
    const q = (new FormData(form).get('query') as string).trim()

    startTransition(async () => {
      setSearchResults([])
      const results = await executeVectorSearch(q)
      setSearchResults(results)
    })
  }

  return (
    <Container>
      <div className="flex flex-row gap-8 mb-8">
        <h1 className="text-3xl font-bold mb-4 whitespace-nowrap">AI Search</h1>
        <p className="text-gray-600 mb-4">
          Użyj wyszukiwania AI, aby znaleźć produkty w naszym sklepie. Wpisz zapytanie, a my
          znajdziemy najlepsze dopasowania. Możesz użyć słów kluczowych, pytań lub opisów, aby
          uzyskać najbardziej trafne wyniki.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative mb-8">
        <input
          name="query"
          type="text"
          placeholder="Search…"
          required
          className="border w-full border-gray-300 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none"
        />

        <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <SearchIcon className="w-5 text-gray-500" />
        </button>
      </form>

      {isPending && (
        <div className="mb-8">
          <LoadingShimmer />
        </div>
      )}

      {searchResults && !isPending && (
        <div className="gap-8 grid grid-cols-3">
          {searchResults.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </Container>
  )
}
