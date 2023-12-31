import type { DocumentDefinition } from "sanity"
import type { StructureBuilder } from "sanity/desk"

import { documentPreviewViews } from "@/sanity/desk/site-preview/document-preview-views.desk"

export const singletonListItem = (
  S: StructureBuilder,
  schema: DocumentDefinition
) =>
  S.listItem()
    .title(schema.title ?? schema.name)
    .icon(schema.icon)
    .child(
      S.document()
        .schemaType(schema.name)
        .documentId(schema.name)
        .views(schema.options?.previewable ? documentPreviewViews(S) : [])
    )
