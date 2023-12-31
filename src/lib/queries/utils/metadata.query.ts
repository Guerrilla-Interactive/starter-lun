import type { Selection, TypeFromSelection } from "groqd"
import { q } from "groqd"

export const seoSettingsQuery = {
  seoSettings: q("*")
    .filterByType("seoSettings")
    .filter()
    .slice(0)
    .grab({
      metadata: q("metadata").grab({
        title: ["coalesce(metadata.title, title, name)", q.string().nullable()],
        desc: [
          "coalesce(metadata.desc, desc, excerpt, pt::text(intro), pt::text(description),  pt::text(content))",
          q.string().nullable(),
        ],
        graphic: q("graphic")
          .grab({
            asset: q("asset")
              .grab({
                _type: q.string(),
                _ref: q.string(),
              })
              .nullable(),
            alt: ["coalesce(alt, asset->altText)", q.string().nullable()],
          })
          .nullable(),
      }),
    })
    .nullable(),
} satisfies Selection

export const metadataQuery = {
  metadata: q("")
    .grab({
      _type: q.string(),
      slug: ["slug.current", q.string().nullable()],
      title: ["coalesce(metadata.title, title, name)", q.string().nullable()],
      desc: [
        "coalesce(metadata.desc, excerpt, pt::text(intro), pt::text(description),  pt::text(content))",
        q.string().nullable(),
      ],
      graphic: q("coalesce(metadata.graphic, image, featuredImage, mainImage)")
        .grab({
          asset: q("asset")
            .grab({
              _type: q.string(),
              _ref: q.string(),
            })
            .nullable(),
          alt: ["coalesce(alt, asset->altText)", q.string().nullable()],
        })
        .nullable(),
      ...seoSettingsQuery,
    })
    .nullable(),
} satisfies Selection

export type MetadataProps = TypeFromSelection<typeof metadataQuery>["metadata"]
