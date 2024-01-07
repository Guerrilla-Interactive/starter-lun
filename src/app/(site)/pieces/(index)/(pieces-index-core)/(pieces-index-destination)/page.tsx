import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

import { generatePageMeta } from "@/lib/generate-page-meta.util"
import { tClient } from "@/sanity/groqd-client"

import { PiecesIndexPage } from "../../pieces.index-page"
import { piecesIndexQuery } from "../(pieces-index-server)/pieces.index-query"
import { PiecesIndexPreview } from "./pieces.index-preview"

export const generateMetadata = async () => {
  const data = await tClient(piecesIndexQuery)
  return generatePageMeta(data?.metadata)
}

const PiecesIndexRoute = async () => {
  const data = await tClient(piecesIndexQuery)

  if (!data) {
    return notFound()
  }

  if (draftMode().isEnabled) {
    return (
      <PiecesIndexPreview initial={data} />
    )
  }

  return <PiecesIndexPage {...data} />
}

export default PiecesIndexRoute
