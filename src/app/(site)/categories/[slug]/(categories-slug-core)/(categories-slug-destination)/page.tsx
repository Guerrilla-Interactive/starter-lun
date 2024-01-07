import { tClient } from "@/sanity/groqd-client"
import { notFound } from "next/navigation"
import { categoriesSlugQuery } from "../(categories-slug-server)/categories.slug-query"
import { generatePageMeta } from "@/src/lib/generate-page-meta.util"
import { CategoriesArchive } from "@/src/app/(site)/pieces/(index)/components/mobile-piece-archive-page.component"
import { draftMode } from "next/headers"
import { CategoriesSlugPreview } from "./categories.slug-preview"


type Props = {
  params: {
    slug: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const data = await tClient(categoriesSlugQuery, params)
  return generatePageMeta(data?.metadata)
}

const CategoriesPage = async ({ params }: Props) => {

  const data = await tClient(categoriesSlugQuery, params)

  // Return not found if the category slug is invalid
  if (!data)
    return notFound()

  const pieces = data?.pieces
  const categories = data?.categories

  const category = categories.find(x => x.slug === params.slug)

  if (!category) {
    return notFound()
  }

  return draftMode().isEnabled ? (
    <CategoriesSlugPreview initial={data} queryParams={params} />
  ) : (
    <CategoriesArchive pieces={pieces} category={category} categories={categories} />
  )

}

export default CategoriesPage
