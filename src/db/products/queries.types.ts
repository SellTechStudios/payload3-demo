import { Product } from '@/payload-types'

export type SearchRequest = {
  searchString?: string
  type: 'all' | 'new' | 'bestseller' | 'quicksearch'
}

export type ProductItem = Pick<
  Product,
  'id' | 'bestseller' | 'title' | 'price' | 'pricePrevious' | 'mediaImages' | 'slug'
>

export type ProductDetails = {
  id: string
  title: string
  price?: number | null
  pricePrevious?: number | null
  vat?: number | null
  weight?: number | null
  quantity?: number | null
  quantityMin?: number | null
  quantityStep?: number | null
  name?: string | null
  code?: string | null
  ean?: string | null
  description?: string | null
  keywords?: string | null
  bestseller?: boolean | null
  specialOffer?: boolean | null
  mediaVideo?:
    | {
        url?: string | null
        id?: string | null
      }[]
    | null
  mediaImages?:
    | {
        url: string
        isMain: boolean
        id?: string | null
      }[]
    | null
  seoTitle?: string | null
  seoDescription?: string | null
  seoImageUrl?: string | null
  slug?: string | null
}

export type FacetOption = {
  value: string | number | boolean
  count: number
  label: string
}

export type FacetBucket = {
  code: string
  label: string
  type: 'checkboxes'
  options: FacetOption[]
}

export type FacetedNavigation = {
  price?: FacetBucket
  manufacturer?: FacetBucket
  bestseller?: FacetBucket
  category?: FacetBucket
}
