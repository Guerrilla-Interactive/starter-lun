import { FileText } from "@phosphor-icons/react"
import { defineType } from "sanity"

import { portableField } from "@/sanity/schemas/generator-field/portable.field"

import { stringField } from "../generator-field/string.field"

export const privacyPolicy = defineType({
  type: "document",
  name: "privacyPolicy",
  title: "Privacy policy",
  icon: FileText,
  options: {
    linkable: true,
  },
  fields: [
    stringField({
      title: "Tittel",
      name: "title",
      required: true,
    }),
    portableField({}),
  ],
})
