import { type SchemaTypeDefinition } from "sanity"

import * as documents from "@/sanity/schemas/documents"
import * as sections from "@/src/components/sections/sections/section-block.schemas"
import * as settings from "@/sanity/schemas/settings"

import { internalLink } from "./fields/internal-link.field"
import { piecesIndexSchema } from "@/src/app/(site)/pieces/(index)/(pieces-index-core)/(pieces-index-server)/pieces.index-schema"
import { categoriesIndexSchema } from "@/src/app/(site)/categories/(index)/(categories-index-core)/(categories-index-server)/categories.index-schema"

export const schemaTypes: SchemaTypeDefinition[] = [
  ...Object.values(settings),
  ...Object.values(documents),
  ...Object.values(sections),
  internalLink,
  piecesIndexSchema,
  categoriesIndexSchema,
]
