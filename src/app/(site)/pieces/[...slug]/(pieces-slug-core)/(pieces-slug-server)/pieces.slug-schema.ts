import { Stool } from "@phosphor-icons/react"
import { defineField, defineType } from "sanity"

import { setIcon } from "@/components/utils/icon.component"
import { arrayField } from "@/sanity/schemas/generator-field/array.field.function"
import { figureField } from "@/sanity/schemas/generator-field/figure.field"
import { metaFields } from "@/sanity/schemas/generator-field/meta-fields.field"
import { portableField } from "@/sanity/schemas/generator-field/portable.field"
import { slugField } from "@/sanity/schemas/generator-field/slug.field"
import { stringField } from "@/sanity/schemas/generator-field/string.field"
import { defaultGroups } from "@/sanity/schemas/utils/default-groups.util"
import { requiredField } from "@/sanity/schemas/generator-field/required.field"
import { booleanField } from "@/sanity/schemas/generator-field/boolean.field"
import { referenceField } from "@/sanity/schemas/generator-field/reference.field"
import { category } from "@/sanity/schemas/documents"
import { slugifyString } from "@/src/lib/queries/utils/slugify-string.util"

export const piecesSlugSchema = defineType({
  type: "document",
  name: "piece",
  title: "Piece",
  icon: setIcon(Stool),
  groups: defaultGroups,
  options: {
    previewable: true,
    linkable: true,
  },
  fields: [
    stringField({
      name: "title",
      title: "Piece Name",
      required: true,
    }),
    slugField({}),
    // If the products have different configuration, we'll add product specific
    // customization features. For now, we assume that all customized orders
    // have same units, largest/smallest sizes, etc.
    booleanField({
      name: "sizeConfigurable",
      title: "Is the size configurable",
    }),
    stringField({
      name: "description",
      title: "Piece Description",
    }),
    referenceField({
      title: "Piece Type",
      name: "pieceTypeReference",
      to: category,
      required: true
    }),
    arrayField({
      title: "Material types",
      name: "materialTypes",
      of: [{ type: "string" }],
    }),
    figureField({
      title: "Main Piece Image",
      name: "mainImage",
    }),
    figureField({
      title: "Secondary Piece Image",
      name: "secondaryImage",
    }),
    arrayField({
      title: "Dimensions",
      name: "dimensions",
      of: [
        {
          type: "object",
          fields: [
            stringField({
              name: "title",
              title: "Dimension title",
              required: true,
            }),
            stringField({
              name: "value",
              title: "Dimension Value",
              required: true,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "value",
            },
          },
        },
      ],
    }),
    portableField({
      title: "Product details",
      name: "details",
      options: {
        includeBlocks: true,
        includeLists: true,
        includeHeadings: true,
      },
    }),


    arrayField({
      title: "Shipping and return policy",
      name: "shippingAndReturnPolicy",
      of: [
        {
          type: "object",
          fields: [
            stringField({
              title: "Title",
              name: "title",
              required: true,
            }),
            portableField({
              title: "Free text",
              name: "value",
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "value",
            },
          },
        },
      ],
    }),
    arrayField({
      title: "Piece Variants",
      name: "variants",
      required: true,
      of: [
        {
          type: "object",
          fields: [
            stringField({
              name: "name",
              title: "Variant Name",
              required: true,
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              validation: (Rule) => Rule.required(),
              options: {
                source: (_doc: any, options: any) => slugifyString(options?.parent?.name || ""),
                isUnique: (slug: string, context: any) => {
                  const { document } = context
                  // Is unique if there's only one variant with the given slug
                  return document.variants.filter((x: any) => x?.slug?.current === slug).length < 2
                }
              }
            }),
            stringField({
              name: "materialType",
              title: "Variant Material Type",
            }),
            requiredField({
              name: "variantColor",
              title: "Variant color",
              type: "color",
            }),
            figureField({
              title: "Variant Main Image",
              name: "variantMainImage",
              required: true,
            }),
            arrayField({
              title: "Variant Image Gallery",
              name: "variantImageGallery",
              of: [{ type: "image" }],
            }),
            defineField({
              name: "variantPrice",
              title: "Variant Price",
              type: "number",
              description: "Price in NOK"
            }),
          ],
          preview: {
            select: {
              title: "name",
              media: "variantMainImage",
            },
          },
        },
      ],
    }),
    arrayField({
      title: "General Image Gallery",
      name: "generalImageGallery",
      of: [{ type: "image" }],
    }),

    defineField({
      name: "standardPrice",
      title: "Standard Price",
      type: "number",
      description: "Price in NOK",
      validation: (Rule) => Rule.required()
    }),
    stringField({
      name: "sku",
      title: "Piece SKU/ID",
    }),
    ...metaFields({}),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
    },
    prepare({ title, media }) {
      return {
        title: title,
        media: media,
      }
    },
  },
})
