import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

import { tClient } from "@/sanity/groqd-client"
import { CategoriesArchive } from "@/src/app/(site)/pieces/(index)/components/mobile-piece-archive-page.component"
import { AllCategoryPieceType } from "@/src/components/category-filter-slider/category-filter-slider.component"
import { generatePageMeta } from "@/src/lib/generate-page-meta.util"

import { categoriesIndexQuery } from "../(categories-index-server)/categories.index-query"
import { CategoriesIndexPreview } from "./categories.index.preview"

export const generateMetadata = async () => {
  const data = await tClient(categoriesIndexQuery)
  return generatePageMeta(data?.metadata)
}

const CategoriesPage = async () => {
  const data = await tClient(categoriesIndexQuery)

  // If there's no data, we return error
  if (!data) {
    return notFound()
  }

  return draftMode().isEnabled ? (
    <CategoriesIndexPreview initial={data} />
  ) : (
    <CategoriesArchive pieces={data?.pieces} category={AllCategoryPieceType} categories={data?.categories} />
  )
}

export default CategoriesPage
