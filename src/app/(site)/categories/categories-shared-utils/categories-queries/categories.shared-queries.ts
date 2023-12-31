import { metadataQuery } from "@/src/lib/queries/utils/metadata.query"
import { TypeFromSelection, q } from "groqd"

export const categoryQueryPreviewSelection = {
	title: q.string(),
	slug: q.slug("slug"),
	activeInSlider: q.boolean().nullish()
}

export type CategoryQueryType = TypeFromSelection<typeof categoryQueryPreviewSelection>

export const categoryQuery = {
	...categoryQueryPreviewSelection,
	...metadataQuery
}

export const categoriesQuery = {
	categories: q("*")
		.filterByType("category")
		.filter()
		.grab$({
			...categoryQueryPreviewSelection
		})
}
