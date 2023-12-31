import type { InferType} from "groqd";
import { q } from "groqd"

import { notDraft } from "@/sanity/not-draft.query"
import { basePageQuery } from "@/sanity/queries/utils/base-page.query"
import { heroSectionObjectQuery } from "@/src/components/sections/sections/hero-section/hero-section.block-query"

import { categoriesQuery } from "../categories/categories-shared-utils/categories-queries/categories.shared-queries"
import {
  piecesQuery,
} from "../pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries"

export const frontPageQuery = q("*")
  .filterByType("siteSettings")
  .filter(`${notDraft}`)
  .slice(0)
  .grabOne("frontPage")
  .deref()
  .grab$({
    ...basePageQuery,
    ...piecesQuery,
    ...categoriesQuery,

    title: q.string().optional(),
    heroSection: q("heroSection").grab(heroSectionObjectQuery).nullable(),
    slug: ["slug.current", q.string().nullable()],
  })
  .nullable()

export type FrontPageQuery = NonNullable<InferType<typeof frontPageQuery>>
