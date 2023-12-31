import { defineField, defineType } from "sanity"

import { booleanField } from "@/sanity/schemas/generator-field/boolean.field"
import { figureField } from "@/sanity/schemas/generator-field/figure.field"
import { linksField } from "@/sanity/schemas/generator-field/links.field"
import { stringField } from "@/schemaGen/string.field"

export const heroSectionBlock = defineField({
  type: "object",
  name: "heroSectionBlock",
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
    // linksField({
    //   name: "links",
    //   title: "Links",
    // }),
    figureField({
      name: "image",
      title: "Image",
    }),
  ],
})

export type HeroSectionBlock = typeof heroSectionBlock
