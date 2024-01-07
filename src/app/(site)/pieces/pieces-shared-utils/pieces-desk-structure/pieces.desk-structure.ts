import { Stool } from "@phosphor-icons/react"
import type { StructureBuilder, StructureResolverContext } from "sanity/desk"

import { singletonListItem } from "@/sanity/desk/structure/utils/singleton-list-item.desk"
import { setIcon } from "@/src/components/utils/icon.component"

import { piecesIndexSchema } from "../../(index)/(pieces-index-core)/(pieces-index-server)/pieces.index-schema"

export const piecesDeskStructure = (
  S: StructureBuilder,
  context: StructureResolverContext
) =>
  S.listItem()
    .title("Pieces")
    .icon(setIcon(Stool))
    .child(
      S.list()
        .title("Pieces")
        .items([
          S.listItem()
            .title("Pieces")
            .icon(setIcon(Stool))
            .schemaType("piece")
            .child(S.documentTypeList("piece").title("All the pieces!")),

          //   S.divider(),

          //   S.listItem()
          //     .title("Aktivitetskategorier")
          //     .icon(setIcon(Tag))
          //     .schemaType("activityCategory")
          //     .child(
          //       S.documentTypeList("activityCategory").title("Alle kategorier")
          //     ),

          S.divider(),
          singletonListItem(S, piecesIndexSchema),
        ])
    )
