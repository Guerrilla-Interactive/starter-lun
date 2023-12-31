import type { BooleanDefinition } from "sanity"
import { defineField } from "sanity"

import type { FieldDef } from "./field.types"

export const booleanField = (
  props: FieldDef<Omit<BooleanDefinition, "options" | "validation">>
) => {
  const { required } = props
  return defineField({
    ...props,
    type: "boolean",
    validation: (Rule) => {
      const rules = []
      if (required) rules.push(Rule.required().error())
      return rules
    },
  })
}
