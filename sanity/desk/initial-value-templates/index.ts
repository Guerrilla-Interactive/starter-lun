import type { Template } from "sanity"

import { SINGLETON_DOC_TYPES } from "@/sanity/schemas/sanity.consts"

export const initialValueTemplates = (templates: Template<any, any>[]) => {
  return [
    ...templates.filter(
      ({ schemaType }) => !SINGLETON_DOC_TYPES.includes(schemaType)
    ),
  ]
}
