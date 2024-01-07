import { q, sanityImage } from "groqd"

export const metadataSettingsQuery = q("*")
  .filterByType("seoSettings")
  .slice(0)
  .grab({
    metaTitle: q.string().nullable(),
    metaDesc: q.string().nullable(),
    shareTitle: q.string().nullable(),
    shareDesc: q.string().nullable(),
    shareGraphic: sanityImage("shareGraphic").nullable(),
  })
  .nullable()
