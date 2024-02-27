import type { StructureBuilder, StructureResolverContext } from "sanity/desk"

import { settingsStructure } from "@/sanity/desk/structure/settings-structure.desk"
export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext
) =>
  S.list()
    .title("Content")
    .items([
      settingsStructure(S),
      S.divider(),
      S.documentTypeListItem("page"),
    ])
