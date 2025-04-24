import { Product } from '@/payload-types'

export type SearchRequest = {
  searchString?: string
  type: 'all' | 'new' | 'bestseller' | 'quicksearch'
  pageSize: number
  page: number
}

export type VectorSearchRequest = {
  searchVector: number[]
}

export type ProductSearchResponse = {
  products: ProductItem[]
  total: number
}

export type ProductItem = Pick<
  Product,
  'id' | 'bestseller' | 'title' | 'price' | 'pricePrevious' | 'mediaImages' | 'slug' | 'rating'
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
  category?: FacetBucket
}
