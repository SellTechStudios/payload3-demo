import React, { Fragment } from 'react'

import { ContentBlock } from '@/payload/blocks/Content/Component'
import { FormBlock } from '@/payload/blocks/Form/Component'
import { MediaBlock } from '@/payload/blocks/MediaBlock/Component'
import type { Page } from '@/payload-types'
import { ProductsShowcaseBlock } from './ProductsShowcaseBlock/Component'
import { ProductsSliderBlock } from './ProductsSliderBlock/Component'

const blockComponents = {
  content: ContentBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  productsSlider: ProductsSliderBlock,
  productsShowcase: ProductsShowcaseBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className={index > 0 ? 'my-12' : ''} key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
