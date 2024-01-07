import type { InferType} from "groqd";
import { q } from "groqd"
import type { Pick } from "react-spring"

import { metadataQuery } from "@/sanity/queries/utils/metadata.query"

import { piecesQuery } from "../../../pieces-shared-utils/pieces-queries/pieces.shared-queries"

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
