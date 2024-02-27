import { Image } from "@phosphor-icons/react"
import { defineType } from "sanity"

import { figureField } from "@/sanity/schemas/generator-field/figure.field"

export const imageSection = defineType({
  name: "imageSection",
  title: "Image section",
  type: "object",
  fields: [
    {
      type: "string",
      name: "size",
      title: "Size",
      initialValue: "medium",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
      },
    },
    figureField({ name: "image", title: "image" }),
  ],
  preview: {
    select: {
      size: "size",
    },
    prepare({ size }) {
      return {
        title: "Image section",
        subtitle: size,
        media: Image,
      }
    },
  },
})
