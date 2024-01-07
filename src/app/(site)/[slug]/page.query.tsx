import type { InferType } from "groqd"
import { q } from "groqd"

import { heroSectionObjectQuery } from "@/src/components/sections/sections/hero-section/hero-section.block-query"
import {
  piecesQuery,
} from "../pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries"
import { categoriesQuery } from "../categories/categories-shared-utils/categories-queries/categories.shared-queries"
import { basePageQuery } from "@/sanity/queries/utils/base-page.query"

export const pageQuery = q("*")
  .filter("_type == 'page' && slug.current == $slug")
  .grab$({
    ...basePageQuery,
    ...piecesQuery,
    ...categoriesQuery,
    title: q.string().optional(),
    heroSection: q("heroSection").grab(heroSectionObjectQuery).nullable(),
  })
  .slice(0)
  .nullable()

export type PageQuery = NonNullable<InferType<typeof pageQuery>>
