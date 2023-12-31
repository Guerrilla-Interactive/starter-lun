import { InferType, q } from "groqd"

import { metadataQuery } from "@/src/lib/queries/utils/metadata.query"
import { piecesQuery } from "@/src/app/(site)/pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries"
import { categoriesQuery } from "../../../categories-shared-utils/categories-queries/categories.shared-queries"

export const categoriesIndexQuery = q("*")
	.filterByType("categoriesIndex")
	.filter()
	.slice(0)
	.grab({
		title: q.string(),
		...metadataQuery,
		...piecesQuery,
		...categoriesQuery
	})
	.nullable()

export type CategoriesIndexQuery = NonNullable<InferType<typeof categoriesIndexQuery>>

