import type { InferType } from "groqd"
import { q } from "groqd"

import { piecesQuery } from "@/src/app/(site)/pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries"
import { categoriesQuery } from "../../../categories-shared-utils/categories-queries/categories.shared-queries"
import { notDraft } from "@/sanity/not-draft.query"
import { basePageQuery } from "@/sanity/queries/utils/base-page.query"

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

