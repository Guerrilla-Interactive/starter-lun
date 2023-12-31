import { Link } from "@phosphor-icons/react"
import { defineField } from "sanity"

import { LinkRenderer } from "@/sanity/components/link-renderer.component"

import { internalLinkField } from "./internal-link.field"

export const internalLinkObjectField = () =>
  defineField({
    name: "internalLinkObject",
    title: "Intern link",
    type: "object",
    icon: Link,
    fields: [
      internalLinkField({ name: "internalLink", title: "Velg dokument" }),
    ],
    options: {
      collapsible: false,
    },
    components: {
      annotation: LinkRenderer,
    },
  })
