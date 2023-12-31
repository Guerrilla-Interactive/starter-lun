import { defineField } from "sanity"

import { LinkRenderer } from "@/sanity/components/link-renderer.component"
import { DownloadSimple } from "@phosphor-icons/react"

export const downloadLinkObjectField = () =>
  defineField({
    name: "downloadLinkObject",
    title: "Nedlastingslink",
    type: "object",
    icon: DownloadSimple,
    fields: [defineField({ name: "file", title: "Fil", type: "file" })],
    options: {
      collapsible: false,
    },
    components: {
      annotation: LinkRenderer,
    },
  })
