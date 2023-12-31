import type { ReferenceDefinition } from "sanity"
import { defineField } from "sanity"

import type { FieldDef } from "./field.types"

export const internalLinkField = (
  props: FieldDef<Omit<ReferenceDefinition, "to" | "validation">>
) => defineField({ ...props, type: "internalLink" })
