"use client"

import type { PiecesIndexQuery } from "./(pieces-index-core)/(pieces-index-server)/pieces.index-query"
import { MobilePieceArchivePage } from "./components/mobile-piece-archive-page.component"

export const PiecesIndexPage = (props: PiecesIndexQuery) => {
  return (
    <>
      <MobilePieceArchivePage {...props} />
    </>
  )
}
