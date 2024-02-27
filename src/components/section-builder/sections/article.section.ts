import { Image } from "@phosphor-icons/react"
import { defineType } from "sanity"

import { figureField } from "@/sanity/schemas/generator-field/figure.field"
import { stringField } from "@/sanity/schemas/generator-field/string.field"



export const articleSection = defineType({
  name: "articleSection",
  title: "Artikler",
  type: "object",
  fields: [
    stringField({
      title: "Tittel",
      name: "title",
      initialValue: "Artikler",
    }),
    stringField({
      title: "Kilde",
      name: "source",
      initialValue: "auto",
      options: {
        list: [
          {
            title: "Hent siste 3 artikler automatisk",
            value: "auto",
          },
          {
            title: "Velg artikler manuelt",
            value: "manual",
          },
        ],
      },
    }),
  ],
})
