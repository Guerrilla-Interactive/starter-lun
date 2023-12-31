import { Gear } from "@phosphor-icons/react"
import type { StructureBuilder } from "sanity/desk"

import { singletonListItem } from "@/sanity/desk/structure/utils/singleton-list-item.desk"
import { privacyPolicy } from "@/sanity/schemas/documents/privacy.document"
import {
  fathomSettings,
  menuSettings,
  seoSettings,
  siteSettings,
} from "@/sanity/schemas/settings"

export const settingsStructure = (S: StructureBuilder) => {
  return S.listItem()
    .title("Settings")
    .icon(Gear)
    .child(
      S.list()
        .title("Settings")
        .items([
          singletonListItem(S, siteSettings),
          singletonListItem(S, seoSettings),
          singletonListItem(S, fathomSettings),
          singletonListItem(S, menuSettings),
          S.divider(),
          singletonListItem(S, privacyPolicy),
        ])
    )
}
