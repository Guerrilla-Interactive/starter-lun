import type {
  ConditionalProperty,
  Image,
  ImageDefinition,
  StringRule,
} from "sanity"
import { defineField } from "sanity"

interface IFigureField extends Omit<ImageDefinition, "type"> {
  group?: string
  excludeCaption?: boolean
  excludeDecorative?: boolean
  excludeAlt?: boolean
  required?: boolean
  hidden?: boolean | ConditionalProperty
}

const imageFields = {
  caption: {
    name: "caption",
    title: "Caption",
    type: "string",
    options: {
      isHighlighted: true,
    },
  },

  decorative: {
    name: "decorative",
    title: "Is the image purely decorative?",
    type: "boolean",
    options: {
      isHighlighted: true,
    },
    initialValue: false,
  },

  alt: {
    name: "alt",
    title: "Alt text",
    type: "string",
    description:
      "Describe the content of the image. Important for SEO and accessiblity.",
    options: {
      isHighlighted: true,
    },
    hidden: ({
      parent,
    }: {
      parent: {
        decorative: boolean
      }
    }) => {
      return parent?.decorative
    },
    validation: (Rule: StringRule) =>
      Rule.custom((field, context) => {
        const parent = context.parent as ImageFieldsType

        if (!parent) return true
        if (
          parent?.decorative ||
          !parent?.asset ||
          (field && field.length > 0)
        ) {
          return true
        }

        return "Alt text is required"
      }),
  },
}

interface ImageFieldsType extends Image {
  caption: typeof imageFields.caption
  decorative: typeof imageFields.decorative
  alt: typeof imageFields.alt
}

export const figureField = ({
  name,
  title,
  group,
  excludeCaption = false,
  excludeDecorative = false,
  excludeAlt = false,
  required = false,
  hidden = false,
}: IFigureField) => {
  const excludeAllFields = excludeCaption && excludeAlt

  return defineField({
    name,
    title: title,
    type: "image",
    group,
    hidden,
    options: {
      hotspot: true,
    },
    fields: !excludeAllFields
      ? [
          ...(!excludeCaption ? [imageFields.caption] : []),
          ...(!excludeDecorative && !excludeAlt
            ? [imageFields.decorative]
            : []),
          ...(!excludeAlt ? [imageFields.alt] : []),
        ]
      : [],
    validation: required
      ? (Rule) =>
          Rule.custom((image) => {
            if (!image || (image && !image.asset)) return "Image is required"
            return true
          })
      : (Rule) => Rule,
    preview: {
      select: {
        imageUrl: "asset.url",
        title: "caption",
      },
      prepare({ title, imageUrl }) {
        return {
          title: title ?? " ",
          imageUrl,
        }
      },
    },
  })
}
