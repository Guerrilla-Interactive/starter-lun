import type { ArrayDefinition } from "sanity"
import { defineField } from "sanity"


import * as SECTIONS from "@/src/components/section-builder/section-block.schemas"

import type { FieldDef } from "./field.types"

const sections = Object.values(SECTIONS).map((section) => ({
  type: section.name
}))

// If sections == string[], include only those sections
const filterSections = (includeSections?: string[]) => {
  if (includeSections && includeSections.length > 0) {
    return sections.filter((section) => includeSections.includes(section.type))
  }
  return sections
}

export const sectionsField = (
  props: FieldDef<Omit<ArrayDefinition, "of" | "name">> & {
    includeSections?: string[]
  }
) => {
  const { includeSections, options, title, required } = props
  const sections = filterSections(includeSections)

  return defineField(
    {
      ...props,
      name: "sections",
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
