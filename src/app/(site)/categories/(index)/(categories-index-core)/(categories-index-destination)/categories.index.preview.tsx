"use client"

import { CategoriesArchive } from "@/src/app/(site)/pieces/(index)/components/mobile-piece-archive-page.component"
import { AllCategoryPieceType } from "@/src/components/category-filter-slider/category-filter-slider.component"
import { PreviewLoadingErrorHOC } from "@/src/components/sanity/preview-loading-error-hoc"

import type { CategoriesIndexQuery } from "../(categories-index-server)/categories.index-query";
import { categoriesIndexQuery } from "../(categories-index-server)/categories.index-query"

const CategoriesIndexPreview = ({
  initial,
}: {
  initial: CategoriesIndexQuery
}) => {

  return (
    <PreviewLoadingErrorHOC
      initial={initial}
      query={categoriesIndexQuery.query}
      queryParams={{}}
      successFn={(data) => {
        return (<CategoriesArchive pieces={data.pieces} categories={data.categories} category={AllCategoryPieceType} />
        )
      }
      }
    />
  )
}

export default CategoriesIndexPreview
