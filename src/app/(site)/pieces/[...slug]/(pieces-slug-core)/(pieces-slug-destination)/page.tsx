import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

import { tClient, tClientDraft } from "@/sanity/groqd-client"
import { generatePageMeta } from "@/src/lib/generate-page-meta.util"

import { PiecesSlugPage } from "../../pieces.slug-page"
import { piecesSlugQuery } from "../(pieces-slug-server)/pieces.slug-query"
import { PiecesSlugPreview } from "./pieces.slug-preview"

type Props = {
  params: {
    slug: Array<string>
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const data = await tClient(piecesSlugQuery, params)
  return generatePageMeta(data?.metadata)
}

export type VariantIdType = string | null

const PieceOrCateogoryPage = async ({ params }: Props) => {
  // Note that since we're using catch all slug, the slug is of type: 
  // pieces/piece-slug/variant-id
  // Note that the dynamic part of the slug is piece-slug and variant id/slug
  // 

  if (params.slug.length > 2) {
    // If the slug length is unnecessarily long,
    // we return not found
    return notFound()
  }
  // Here, params.slug is length either 1 or 2 thus we can extract 
  // piece slug (variant slug could be possibly null, in which case
  // we dispaly the page for the main variant)
  let variant: VariantIdType = null
  const pieceSlug = params.slug[0]!
  if (params.slug.length > 1) {
    variant = params.slug[1]!
  }

  // Note that the page is the same for each variant thus we're 
  // are extracting the piece slug to get the piece details. 
  const paramsWithoutVariant = { slug: pieceSlug }
  const data = await tClient(piecesSlugQuery, paramsWithoutVariant)
  const draftData = await tClientDraft(piecesSlugQuery, paramsWithoutVariant)

  // If there's no data for the given piece slug, we return error
  if (!data) {
    return notFound()
  }

  // If the variant slug is defined but not valid, we return error as well
  if (variant && !data.variants?.find(x => variant === x.slug)) {
    return notFound()
  }

  if (draftMode().isEnabled) {
    return (
      <PiecesSlugPreview
        initial={draftData!}
        queryParams={paramsWithoutVariant}
        variant={variant}
        pieceSlug={pieceSlug}
      />
    )
  }

  return <PiecesSlugPage page={data} variant={variant} pieceSlug={paramsWithoutVariant.slug} />
}

export default PieceOrCateogoryPage
