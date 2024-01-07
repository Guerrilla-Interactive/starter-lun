import type { InferType } from "groqd"
import { q } from "groqd"

import { notDraft } from "@/sanity/not-draft.query"
import { basePageQuery } from "@/sanity/queries/utils/base-page.query"

import { pieceQuery } from "../../../pieces-shared-utils/pieces-queries/pieces.shared-queries"

export const piecesSlugQuery = q("*")
  .filterByType("piece")
  .filter(`${notDraft} && $slug == slug.current`)
  .grab({
    ...pieceQuery,
    ...basePageQuery,
  })
  .slice(0)
  .nullable()

export type PiecesSlugQuery = NonNullable<InferType<typeof piecesSlugQuery>>
