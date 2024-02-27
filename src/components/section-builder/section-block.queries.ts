import type { Selection } from "groqd"
import { q } from "groqd"
/* IMPORT_NEW_QUERY_PLACEHOLDER */

export const sectionBlockQuery = {
  sectionBlocks: q("sectionBlocks")
    .filter()
    .grab(
      {
        _key: q.string(),
        _type: q.string(),
      },
      {
        // "_type == '$blockGroupName'": $blockName,
      }
    )
    .nullable(),
} satisfies Selection
