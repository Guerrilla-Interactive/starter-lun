import { metaFields } from "@/sanity/schemas/generator-field/meta-fields.field"
import { stringField } from "@/sanity/schemas/generator-field/string.field"
import { defaultGroups } from "@/sanity/schemas/utils/default-groups.util"
import { defineType } from "sanity"

export const piecesIndexSchema = defineType({
  type: "document",
  name: "piecesIndex",
  title: "Pieces archive page",
  groups: defaultGroups,
  options: {
    previewable: true,
    linkable: true,
  },
  fields: [
    stringField({
      name: "title",
      required: true,
      group: "basic",
    }),
    ...metaFields({})
  ],
})
