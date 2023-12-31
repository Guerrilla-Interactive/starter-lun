import { ArrowUpRight } from "@phosphor-icons/react"
import { defineField } from "sanity"

import { LinkRenderer } from "@/sanity/components/link-renderer.component"

import { externalLinkField } from "./external-link.field"

export const externalLinkObjectField = () =>
  defineField({
    name: "externalLinkObject",
    title: "Ekstern link",
    type: "object",
    icon: ArrowUpRight,
    fields: [externalLinkField({ name: "url", title: "URL" })],
    options: {
      collapsible: false,
    },
    components: {
      annotation: LinkRenderer,
    },
  })
