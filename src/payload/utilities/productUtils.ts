import { Product } from '@/payload-types'

export const GetMainImageUrl = (product: Product): string =>
  product.mediaImages?.find((i) => i.isMain)?.url || ''
