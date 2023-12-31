import type { ArrayDefinition, ReferenceDefinition } from "sanity"
import { defineArrayMember, defineField } from "sanity"

import type { FieldDef } from "./field.types"

type MultipleOrSingle<AllowMultiple = boolean> = AllowMultiple extends true
  ? {
      allowMultiple: AllowMultiple
      validation?: ArrayDefinition["validation"]
      itemTitle?: string
      min?: number
      max?: number
    }
  : {
      allowMultiple?: AllowMultiple
      validation?: ReferenceDefinition["validation"]
    }

export const referenceField = (
  props: FieldDef<Omit<ReferenceDefinition, "validation">> & MultipleOrSingle
) => {
  if (props?.allowMultiple) {
    const arrayProps = {
      name: props.name,
      title: props.title,
      description: props.description,
      group: props.group,
      hidden: props.hidden,
      readOnly: props.readOnly,
      options: { required: props.required },
    }
    const referenceProps = {
      title: props.itemTitle ?? "Select document",
      to: props.to,
      options: props.options,
      weak: props.weak,
    }
    const { required, min, max, validation } = props

    return defineField({
      ...arrayProps,
      type: "array",
      of: [
        defineArrayMember({
          ...referenceProps,
          type: "reference",
        }),
      ],
      validation: validation
        ? validation
        : (Rule) => {
            const rules = [Rule.unique().error()]
            if (required) rules.push(Rule.required().error())
            if (min) rules.push(Rule.min(min).error())
            if (max) rules.push(Rule.max(max).error())
            return rules
          },
    })
  }

  return defineField({
    ...props,
    type: "reference",
    options: {
      ...props?.options,
      required: props.required,
    },
    validation: props?.validation
      ? props.validation
      : (Rule) => {
          const rules = []
          if (props.required) rules.push(Rule.required().error())
          return rules
        },
  })
}
