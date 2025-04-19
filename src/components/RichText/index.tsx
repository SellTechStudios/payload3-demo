import { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from '@payloadcms/richtext-lexical/react'
import type {
  MediaBlock as MediaBlockProps,
  ProductsShowcaseBlock as ProductsShowcaseProps,
} from '@/payload-types'

import { MediaBlock } from '@/payload/blocks/MediaBlock/Component'
import { ProductsShowcaseBlock } from '@/payload/blocks/ProductsShowcaseBlock/Component.Client'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { cn } from '@/payload/utilities/cn'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<MediaBlockProps | ProductsShowcaseProps>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-span-3 col-start-1"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
        disableInnerContainer={true}
      />
    ),
    productsShowcaseBlock: ({ node }) => (
      <ProductsShowcaseBlock className="col-span-3 col-start-1" {...node.fields} />
    ),
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
  enableProse?: boolean
} & React.HTMLAttributes<HTMLDivElement>

export default function RichText(props: Props) {
  const { className, enableProse = true, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md dark:prose-invert ': enableProse,
        },
        className,
      )}
      {...rest}
    />
  )
}
