"use client"

import { PreviewLoadingErrorHOC } from "@/src/components/sanity/preview-loading-error-hoc"

import { PiecesIndexPage } from "../../pieces.index-page"
import type { PiecesIndexQuery } from "../(pieces-index-server)/pieces.index-query"
import { piecesIndexQuery } from "../(pieces-index-server)/pieces.index-query"

const PiecesIndexPreview = ({
  initial,
}: {
  initial: PiecesIndexQuery
}) => {
  return (
    <PreviewLoadingErrorHOC
      initial={initial}
      query={piecesIndexQuery.query}
      successFn={(data) =>
        <PiecesIndexPage {...data} />
      }
    />
  )
}
export default PiecesIndexPreview
