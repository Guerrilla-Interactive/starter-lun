import type { InferType, Selection } from "groqd"
import { q } from "groqd"

export const imageInnerQuery = {
  _ref: ["asset._ref", q.string().nullable()],
  caption: q.string().nullable(),
  alt: ["coalesce(alt, asset->altText)", q.string().nullable()],
  crop: q
    .object({
      top: q.number(),
      bottom: q.number(),
      left: q.number(),
      right: q.number(),
    })
    .nullable(),
  hotspot: q
    .object({
      x: q.number(),
      y: q.number(),
      height: q.number(),
      width: q.number(),
    })
    .nullable(),
  asset: q("asset")
    .deref()
    .grab({
      url: q.string(),
      metadata: q("metadata").grab({
        dimensions: q.object({
          aspectRatio: q.number(),
          height: q.number(),
          width: q.number(),
        }),

        lqip: q.string(),
        
      }),
    })
    .nullable(),
} satisfies Selection

export const imageQuery = (fieldName: string) => {
  return q(fieldName).grab(imageInnerQuery).nullable()
}

export type ImageType = InferType<ReturnType<typeof imageQuery>>
