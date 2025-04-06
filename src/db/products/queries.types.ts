export type SearchRequest = {
  searchString?: string
  categoryId?: string
}

export type ProductItem = {
  id: string
  isPromoted: boolean
  name: string
  price: number
  pricePrevious: number
  ean: string
  mediaImages: MediaImage[]
  slug: string
  manufacturer: string
}

export type QueryType = {
  limit: number
  page: number
  depth: number
  where: {
    or?: Array<{ [key: string]: { contains: string } }>
  }
}

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
