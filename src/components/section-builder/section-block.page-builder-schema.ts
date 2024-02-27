import type { ArrayDefinition } from "sanity"
import { defineField } from "sanity"

import type { FieldDef } from "@/sanity/schemas/generator-field/field.types"

import * as sectionBlocks from "./section-block.schemas"

const SECTION_BLOCK_NAMES = Object.values(sectionBlocks).map((section) => ({
  type: section.name,
}))

// If sections == string[], include only those sections
const filterSections = (includeSections?: string[]) => {
  if (includeSections && includeSections.length > 0) {
    return SECTION_BLOCK_NAMES.filter((section) =>
      includeSections.includes(section.type)
    )
  }
  return SECTION_BLOCK_NAMES
}

export const sectionBlockPageBuilder = (
  props: FieldDef<Omit<ArrayDefinition, "of" | "name">> & {
    includeSections?: string[]
  }
) => {
  const { includeSections, options, title, required } = props
  const sections = filterSections(includeSections)

  return defineField(
    {
      ...props,
      name: "sectionBlocks",
      title: title ?? "Sidebygger",
      type: "array",
      of: sections,
      options: {
        ...options,
        required,
      },
    },
    {
      strict: false,
    }
  )
}
