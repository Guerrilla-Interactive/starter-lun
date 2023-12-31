import { Globe } from "@phosphor-icons/react"
import { defineField, defineType } from "sanity"

export const siteSettings = defineType({
  type: "document",
  name: "siteSettings",
  title: "Site settings",
  icon: Globe,
  fields: [
    defineField({
      name: "frontPage",
      title: "Front page",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "page" }],
    }),
    defineField({
      name: "privayPolicyPage",
      title: "Privacy policy",
      type: "reference",
      validation: (Rule) => Rule.required(),
      to: [{ type: "page" }],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site settings",
      }
    },
  },
})
