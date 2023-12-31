import { documentPreviewViews } from "@/sanity/desk/site-preview/document-preview-views.desk"
import { PREVIEW_DOC_TYPES } from "@/sanity/schemas/sanity.consts"
import type { DefaultDocumentNodeResolver } from "sanity/lib/exports/desk"

// Example on how to add views for a schemaType
// https://www.sanity.io/docs/create-custom-document-views-with-structure-builder
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, ctx) => {
  const schemaType = ctx.schema.get(ctx.schemaType)

  if (!schemaType) return S.document()

  // add preview based on schema tname
  if (PREVIEW_DOC_TYPES.includes(schemaType.name)) {
    return S.document().views(documentPreviewViews(S))
  }

  return S.document()
}
