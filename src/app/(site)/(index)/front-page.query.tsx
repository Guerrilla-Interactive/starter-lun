import type { InferType } from "groqd";
import { q } from "groqd"

import { notDraft } from "@/sanity/not-draft.query"
import { basePageQuery } from "@/sanity/queries/utils/base-page.query"

export const frontPageQuery = q("*")
  .filterByType("siteSettings")
  .filter(`${notDraft}`)
  .slice(0)
  .grabOne("frontPage")
  .deref()
  .grab$({
    ...basePageQuery,
    title: q.string().optional(),
    slug: ["slug.current", q.string().nullable()],
  })
  .nullable()

export type FrontPageQuery = NonNullable<InferType<typeof frontPageQuery>>
