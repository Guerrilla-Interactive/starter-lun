import { q } from "groqd"

import { linksGroupSelect } from "../navigation/links.query"

// filterByType("menuSettings")
export const menuQuery = q("*")
  .filterByType("menuSettings")
  .slice(0)
  .grab({
    menu: q("menu").filter().select(linksGroupSelect).nullable(),
  })
  .nullable()
