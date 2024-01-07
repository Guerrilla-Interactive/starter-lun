import type { InferType } from "groqd"
import { q } from "groqd"

import { basePageQuery } from "@/sanity/queries/utils/base-page.query"
import { heroSectionObjectQuery } from "@/src/components/sections/sections/hero-section/hero-section.block-query"

import { categoriesQuery } from "../categories/categories-shared-utils/categories-queries/categories.shared-queries"
import {
  piecesQuery,
} from "../pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries"

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
