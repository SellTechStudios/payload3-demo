import { Product } from '@/payload-types'

export type SearchRequest = {
  searchString?: string
  type: 'all' | 'new' | 'bestseller' | 'quicksearch'
}

export type ProductItem = Pick<
  Product,
  'id' | 'bestseller' | 'title' | 'price' | 'pricePrevious' | 'mediaImages' | 'slug'
>

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
