import { Secret } from "@/sanity/components/secret.component"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { defineType } from "sanity"

export const fathomSettings = defineType({
  type: "document",
  name: "fathomSettings",
  title: "Fathom password",
  icon: MagnifyingGlass,
  fields: [
    {
      name: "fathomPassword",
      title: "Fathom password",
      type: "string",
      components: {
        field: Secret,
      },
    },
  ],
  preview: {
    prepare() {
      return {
        title: "Fathom settings",
      }
    },
  },
})
