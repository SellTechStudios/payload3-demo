import { inCategoryMatch, specialOffersMatch } from './match'

import { newProductsSort } from './sort'
import { quickSearch } from './search'

const aggregates = {
  match: { promotedMatch: specialOffersMatch, inCategoryMatch },
  search: { quickSearch },
  sort: { newProductsSort },
}

export default aggregates
