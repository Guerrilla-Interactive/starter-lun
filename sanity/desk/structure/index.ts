import type { StructureBuilder, StructureResolverContext } from "sanity/desk"

import { settingsStructure } from "@/sanity/desk/structure/settings-structure.desk"
import { piecesDeskStructure } from "@/src/app/(site)/pieces/pieces-shared-utils/pieces-desk-structure/pieces.desk-structure"

import { categoriesDeskStructure } from "@/src/app/(site)/categories/categories-shared-utils/categories-desk-structure/categories-desk-structure"

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext
) =>
  S.list()
    .title("Online store")
    .items([
      settingsStructure(S),

      S.divider(),

      S.documentTypeListItem("page"),
      S.divider(),
      categoriesDeskStructure(S, context),
      S.divider(),
      piecesDeskStructure(S, context),
      S.divider(),
    ])
