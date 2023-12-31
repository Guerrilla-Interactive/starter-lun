"use client"

import type { MenuSettings } from "@/lib/queries/settings/settings.query"

import { CollapsedMenu } from "./collapsed-menu.component"
import { ExpandedMenu } from "./expanded-menu.component"

export const Menu = ({ menu }: MenuSettings) => {
  return (
    <nav className="z-30 flex grow items-center justify-end gap-4  lg:gap-6 2xl:gap-8">
      <ExpandedMenu mainMenu={menu} />
      <CollapsedMenu mainMenu={menu} />
    </nav>
  )
}
