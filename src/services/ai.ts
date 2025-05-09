import { Product } from '@/payload-types'
import { embed } from '@nomic-ai/atlas'

const MODEL = 'nomic-embed-text-v1.5'

export async function GetProductVector(product: Product) {
  const document = `
      Nazwa: ${product.title}.
      Opis: ${product.description}.
      Kolor: ${product.color}.
      Materiał: ${product.material}.
      Producent: ${product.manufacturer}.
      Cena: ${product.price}.
      Przecena: ${product.pricePrevious != product.price ? 'tak' : 'nie'}.
    `

  const result = await embed([document], { model: MODEL, taskType: 'search_document' }, undefined)

  return result[0] as unknown as number[]
}

export async function GetSearchQueryVector(query: string) {
  const result = await embed([query], { model: MODEL, taskType: 'search_query' }, undefined)

  return result[0] as unknown as number[]
}
