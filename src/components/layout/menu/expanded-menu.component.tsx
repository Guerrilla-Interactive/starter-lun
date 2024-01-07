import type { MainMenu } from "@/sanity/queries/settings/settings.query"
import { cn } from "@/utils/cn.util"

import { MenuItem } from "./menu-item.component"

export const ExpandedMenu = ({ mainMenu }: { mainMenu: MainMenu }) => {
  if (!mainMenu || mainMenu?.length < 1) return null

  return (
    <ul className={cn("hidden flex-row items-center gap-4 md:flex xl:gap-6")}>
      {mainMenu?.map((item) => {
        if (!("linkType" in item)) return null
        return <MenuItem key={item._key} item={item} />
      })}
    </ul>
  )
}
