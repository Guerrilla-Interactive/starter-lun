import { defineField } from "sanity"
import { stringField } from "@/schemaGen/string.field"
import { figureField } from "@/sanity/schemas/generator-field/figure.field"
import { linksField } from "@/sanity/schemas/generator-field/links.field"
import { boolean } from "zod"
import { booleanField } from "@/sanity/schemas/generator-field/boolean.field"

export const heroSectionObject = defineField({
  type: "object",
  name: "heroSection",
  fields: [
    booleanField({
      name: "hideTitle",
      title: "Tittel under bilde",
    }),

    stringField({
      name: "title",
      title: "Title",
      hidden: ({ parent }) => parent?.hideTitle,
      options: {},
    }),
    stringField({
      name: "subtitle",
      title: "Subtitle",
      hidden: ({ parent }) => parent?.hideTitle,
    }),
    linksField({
      name: "links",
      title: "Links",
    }),
    figureField({
      name: "image",
      title: "Image",
    }),
  ],
})
