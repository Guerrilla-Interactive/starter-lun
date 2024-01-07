import type { Selection, TypeFromSelection } from "groqd"
import { q } from "groqd"

import { imageInnerQuery, imageQuery } from "@/sanity/queries/utils/image.query"
import { portableTextQuery } from "@/src/components/portable-text/portable-field.query"
import { categoryQueryPreviewSelection } from "../../../categories/categories-shared-utils/categories-queries/categories.shared-queries"

export const pieceVariantQuery = {
  _key: q.string(),
  name: q.string(),
  slug: q.slug('slug'),
  variantPrice: q.number().optional().nullable(),
  materialType: q.string().nullable().optional(),
  sku: q.string().nullable().optional(),
  variantColor: q.object({ hex: q.string() }),
  variantMainImage: imageQuery("variantMainImage").nullable(),
  variantImageGallery: q("variantImageGallery")
    .filter()
    .grab(imageInnerQuery)
    .nullable(),
} satisfies Selection

export type PieceVariantQuery = TypeFromSelection<typeof pieceVariantQuery>

export const pieceVariantsQuery = {
  variants: q("variants").filter().grab$(pieceVariantQuery).nullable(),
} satisfies Selection

export type PieceVariantsQuery = TypeFromSelection<typeof pieceVariantsQuery>

export const pieceQuery = {
  _id: q.string(),
  _type: q.string(),
  _updatedAt: q.string(),
  slug: ["slug.current", q.string().optional()],
  title: q.string(),
  pieceType: q("pieceTypeReference").deref().grab(categoryQueryPreviewSelection).nullable(),
  sizeConfigurable: q.boolean().nullish(),
  description: q.string().nullable(),
  mainImage: imageQuery("mainImage").nullable(),
  secondaryImage: imageQuery("secondaryImage").nullable(),
  materialTypes: q
    .array(q.string().nullable().optional())
    .nullable()
    .optional(),
  generalImageGallery: q("generalImageGallery")
    .filter()
    .grab(imageInnerQuery)
    .nullable(),
  standardPrice: q.number(),
  sku: q.string().nullable().optional(),
  dimensions: q
    .array(
      q.object({
        title: q.string(),
        value: q.string(),
      })
    )
    .optional()
    .nullable(),
  details: portableTextQuery("details").nullable(),
  shippingAndReturnPolicy: q
    .array(
      q.object({
        title: q.string(),
      })
    )
    .optional()
    .nullable(),
  ...pieceVariantsQuery,
} satisfies Selection

export type PieceQuery = TypeFromSelection<typeof pieceQuery>

export type PieceType = PieceQuery["pieceType"]


export const piecesQuery = {
  pieces: q("*")
    .filterByType("piece")
    .filter()
    .grab$({
      ...pieceQuery,
    })
    .nullable(),
} satisfies Selection
