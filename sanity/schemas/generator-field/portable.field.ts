import { defineField } from "sanity"

import { externalLinkObjectField } from "./external-link-object.field"
import { internalLinkObjectField } from "./internal-link-object.field"
import { downloadLinkObjectField } from "./download-link-object.field"
import { PORTABLE_BLOCKS } from "../portable-blocks"

// import * as portableBlocks from "../portable-blocks"

type PortableFieldType = {
  name?: string
  title?: string
  description?: string
  includeBlocks?: boolean | string[]
  includeLists?: boolean
  includeHeadings?: boolean
  hidden?: boolean | ((value: any) => boolean)
  group?: string
  options?: object
}

// BLOCKS
/* These will be included if includeBlocks == true */
const blocks = Object.values(PORTABLE_BLOCKS).map((block) => ({
  type: block.name,
}))

// HEADINGS
/* Will be included if includeHeadings == true */
const headingStyles = [
  { title: "H2", value: "h2" },
  { title: "H3", value: "h3" },
  { title: "H4", value: "h4" },
]

// LISTS
/* Will be included if includeLists == true */
const listObjects = [
  { title: "Bullet list", value: "bullet" },
  { title: "Numbered list", value: "number" },
]

// LINKS (always included)
const linkObjects = [
  internalLinkObjectField(),
  externalLinkObjectField(),
  downloadLinkObjectField(),
]

// DECORATORS (always included)
const basicDecorators = [
  { title: "Strong", value: "strong" },
  { title: "Emphasis", value: "em" },
]

const filterBlocks = (includeBlocks: PortableFieldType["includeBlocks"]) => {
  if (includeBlocks === false) return []
  if (includeBlocks === true) return blocks
  if (includeBlocks && includeBlocks.length > 0) {
    return blocks.filter((block) => includeBlocks.includes(block.type))
  }
  return []
}

export const portableField = ({
  name = "content",
  title,
  description,
  group,
  includeLists,
  includeHeadings,
  includeBlocks = false,
  hidden,
  options,
}: PortableFieldType) => {
  const blocks = filterBlocks(includeBlocks)

  return defineField({
    name,
    title,
    description,
    group,
    type: "array",
    of: [
      {
        type: "block",
        styles: includeHeadings ? headingStyles : [],
        lists: includeLists ? listObjects : [],
        marks: {
          decorators: basicDecorators,
          annotations: linkObjects,
        },
      },
      ...blocks,
    ],
    hidden,
    options,
  })
}
