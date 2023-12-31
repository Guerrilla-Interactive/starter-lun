import { InferType, q } from "groqd"

import { metadataQuery } from "@/src/lib/queries/utils/metadata.query"

import { piecesQuery } from "../../../pieces-shared-utils/pieces-queries/pieces.shared-queries"
import { Pick } from "react-spring"

export const piecesIndexQuery = q("*")
  .filterByType("piecesIndex")
  .filter()
  .slice(0)
  .grab({
    title: q.string(),
    ...piecesQuery,
    ...metadataQuery,
  })
  .nullable()

export type PiecesIndexQuery = NonNullable<InferType<typeof piecesIndexQuery>>
export type PiecesQuery = Pick<PiecesIndexQuery, 'pieces'>
