import type { UrlDefinition } from "sanity"
import { defineField } from "sanity"

import type { FieldDef } from "./field.types"

export const externalLinkField = (props: FieldDef<UrlDefinition>) =>
  defineField({
    ...props,
    type: "url",
    options: {
      ...props.options,
      required: props.required,
    },
    validation: (Rule) => {
      const rules = [
        Rule.uri({
          scheme: ["https", "http", "mailto", "tel"],
        }).error(
          'Ugyldig URL. URLen må starte med "https://", "http://", "mailto:" eller "tel:".'
        ),
      ]
      if (props.required) rules.push(Rule.required().error())
      return rules
    },
  })
