import type { StringDefinition } from "sanity"
import { defineField } from "sanity"

import type { FieldDef } from "./field.types"

export const stringField = (props: FieldDef<StringDefinition>) =>
  defineField({
    ...props,
    type: "string",
    options: {
      ...props.options,
      required: props.required,
    },
    validation: (Rule) => {
      const rules = []
      if (props.required) rules.push(Rule.required().error())
      return rules
    },
  })
