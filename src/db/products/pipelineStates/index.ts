import { documentsBucket, manufacturerBucket, priceBucket, promotedBucket } from './buckets'
import { toProductSearchItem, toSliderItem } from './project'

import { joinWithManufacturers } from './join'

const stages = {
  project: {
    toProductSearchItem,
    toSliderItem,
  },
  join: {
    joinWithManufacturers,
  },
  buckets: {
    documentsBucket,
    manufacturerBucket,
    priceBucket,
    promotedBucket,
  },
}

export default stages
