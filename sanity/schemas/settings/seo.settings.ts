import { MagnifyingGlass } from "@phosphor-icons/react"
import { defineType } from "sanity"

import { metaFields } from "@/sanity/schemas/generator-field/meta-fields.field"

export const seoSettings = defineType({
  type: "document",
  name: "seoSettings",
  title: "Standard SEO & metadata",
  icon: MagnifyingGlass,
  fields: [...metaFields({ title: "Standard SEO settings", group: null })],
  preview: {
    prepare() {
      return {
        title: "SEO settings",
      }
    },
  },
})
