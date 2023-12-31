import type { ArrayDefinition } from "sanity"
import { defineField } from "sanity"

import type { Field } from "./types"

export const arrayField = (
  props: Field<ArrayDefinition> & {
    min?: number
    max?: number
  }
) => {
  const { options, required, min, max } = props

  return defineField({
    ...props,
    type: "array",
    validation: (Rule) => {
      const rules = []
      if (required) rules.push(Rule.required().error())
      if (min) rules.push(Rule.min(min).error())
      if (max) rules.push(Rule.max(max).error())
      return rules
    },
    options: {
      ...options,
      required,
    },
  })
}
