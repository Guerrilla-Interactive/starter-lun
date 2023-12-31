import type { InferType } from "groqd"
import { q } from "groqd"

import { tClient } from "@/lib/sanity/groqd-client"

import { menuQuery } from "./menu.query"
import { metadataSettingsQuery } from "./metadata.query"
import { privacyQuery } from "./privacy.query"

const settingsQuery = q("").grab({
  privacy: privacyQuery,
  metadata: metadataSettingsQuery,
  menu: menuQuery,
  //footer: footerQuery,
})

export type SiteSettings = NonNullable<InferType<typeof settingsQuery>>
export type MenuSettings = NonNullable<InferType<typeof menuQuery>>
export type MainMenu = MenuSettings["menu"]

export const getSiteSettings = async () => {
  return await tClient(settingsQuery, {})
}
