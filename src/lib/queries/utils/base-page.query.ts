import { q, Selection } from "groqd"

import { metadataQuery } from "./metadata.query"

export const basePageQuery = {
  _id: q.string(),
  _type: q.string(),
  ...metadataQuery,
} satisfies Selection
