import { resolvePath } from "@/src/lib/navigation/resolve-path.util"
import { Eye, PencilSimple } from "@phosphor-icons/react"
import { SanityDocument } from "next-sanity"
import { Iframe } from "sanity-plugin-iframe-pane"
import type { StructureBuilder } from "sanity/desk"

export const documentPreviewViews = (S: StructureBuilder) => [
  S.view.form().title("Rediger").icon(PencilSimple),
  S.view.component(Iframe).title("Forhåndsvisning").icon(Eye).options({
    url: {
      preview: getPreviewUrl,
      draftMode: '/api/draft',
      origin: 'same-origin'
    }
  }),
]

function getPreviewUrl(doc: SanityDocument) {
  const defaultPath = "/"
  const path = resolvePath(doc._type, doc?.slug?.current || null) || defaultPath
  return path
}
