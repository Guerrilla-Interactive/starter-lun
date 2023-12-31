"use client"

import { PreviewLoadingErrorHOC } from "@/src/components/sanity/preview-loading-error-hoc"
import { CategoriesSlugQuery, categoriesSlugQuery } from "../(categories-slug-server)/categories.slug-query"
import { CategoriesArchive } from "@/src/app/(site)/pieces/(index)/components/mobile-piece-archive-page.component"
import { AllCategoryPieceType } from "@/src/components/category-filter-slider/category-filter-slider.component"

export const CategoriesSlugPreview = ({
	initial,
	queryParams,
}: {
	initial: CategoriesSlugQuery
	queryParams: { slug: string }
}) => {

	return (
		<PreviewLoadingErrorHOC
			initial={initial}
			query={categoriesSlugQuery.query}
			queryParams={queryParams}
			successFn={(data) => {
				const category = data.categories.find(x => x.slug === queryParams.slug) || AllCategoryPieceType
				return (<CategoriesArchive pieces={data.pieces} categories={data.categories} category={category} />
				)
			}
			}
		/>
	)
}
