import dynamic from "next/dynamic"
import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

import { generatePageMeta } from "@/lib/generate-page-meta.util"
import { tClient, tClientDraft } from "@/sanity/groqd-client"

import { PiecesIndexPage } from "../../pieces.index-page"
import { piecesIndexQuery } from "../(pieces-index-server)/pieces.index-query"

const PiecesIndexPreview = dynamic(() => import('./pieces.index-preview'))

export const generateMetadata = async () => {
  const data = await tClient(piecesIndexQuery)
  return generatePageMeta(data?.metadata)
}

const PiecesIndexRoute = async () => {
  const data = await tClient(piecesIndexQuery)
  const draftData = await tClientDraft(piecesIndexQuery)

  if (!data) {
    return notFound()
  }

  if (draftMode().isEnabled) {
    return (
      <PiecesIndexPreview initial={draftData!} />
    )
  }

  return <PiecesIndexPage {...data} />
}

export default PiecesIndexRoute
