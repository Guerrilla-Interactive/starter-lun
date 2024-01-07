"use client"

import { PreviewLoadingErrorHOC } from "@/src/components/sanity/preview-loading-error-hoc"

import { PiecesSlugPage } from "../../pieces.slug-page"
import type { PiecesSlugQuery } from "../(pieces-slug-server)/pieces.slug-query"
import { piecesSlugQuery } from "../(pieces-slug-server)/pieces.slug-query"
import type { VariantIdType } from "./page"

export const PiecesSlugPreview = ({
  initial,
  queryParams,
  variant,
  pieceSlug,
}: {
  initial: PiecesSlugQuery
  queryParams: { slug: string }
  variant: VariantIdType
  pieceSlug: string
}) => {

  return (
    <PreviewLoadingErrorHOC
      initial={initial}
      query={piecesSlugQuery.query}
      queryParams={queryParams}
      successFn={(data) =>
        <PiecesSlugPage page={data} variant={variant} pieceSlug={pieceSlug} />
      }
    />
  )
}
