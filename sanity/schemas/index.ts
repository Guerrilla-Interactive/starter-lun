import { type SchemaTypeDefinition } from "sanity"

import * as documents from "@/sanity/schemas/documents"
import * as sections from "@/src/components/section-builder/section-block.schemas"
import * as settings from "@/sanity/schemas/settings"

import { internalLink } from "./fields/internal-link.field"
export const schemaTypes: SchemaTypeDefinition[] = [
  ...Object.values(settings),
  ...Object.values(documents),
  ...Object.values(sections),
  internalLink,
]
