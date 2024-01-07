import type {TypeFromSelection } from "groqd";
import { q } from "groqd"

import { metadataQuery } from "@/sanity/queries/utils/metadata.query"

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
