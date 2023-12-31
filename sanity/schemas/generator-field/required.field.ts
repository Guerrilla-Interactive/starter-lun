import type { FieldDefinition } from "sanity"
import { defineType } from "sanity"

export const requiredField = (object: FieldDefinition) => {
  return defineType({
    ...object,
    validation: (Rule) => Rule.required(),
  })
}
