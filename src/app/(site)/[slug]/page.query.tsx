import type { InferType } from "groqd"
import { q } from "groqd"

import { basePageQuery } from "@/sanity/queries/utils/base-page.query"


export const pageQuery = q("*")
  .filter("_type == 'page' && slug.current == $slug")
  .grab$({
    ...basePageQuery,
    title: q.string().optional(),
  })
  .slice(0)
  .nullable()

export type PageQuery = NonNullable<InferType<typeof pageQuery>>
