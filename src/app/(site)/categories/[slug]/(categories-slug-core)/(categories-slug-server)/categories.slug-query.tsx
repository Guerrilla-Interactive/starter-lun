import type { InferType } from "groqd"
import { q } from "groqd"

import { basePageQuery } from "@/lib/queries/utils/base-page.query"
import { notDraft } from "@/src/lib/sanity/not-draft.query"
import { piecesQuery } from "@/src/app/(site)/pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries"
import { categoriesQuery } from "../../../categories-shared-utils/categories-queries/categories.shared-queries"

export const categoriesSlugQuery = q("*")
	.filterByType("category")
	.filter(`${notDraft} && $slug == slug.current`)
	.grab({
		...basePageQuery,
		...piecesQuery,
		...categoriesQuery,
	})
	.slice(0)
	.nullable()

export type CategoriesSlugQuery = NonNullable<InferType<typeof categoriesSlugQuery>>

