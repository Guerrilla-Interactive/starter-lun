import { defineType } from "sanity"

import { linksField } from "../generator-field/links.field"
import { List } from "@phosphor-icons/react"

export const menuSettings = defineType({
  type: "document",
  name: "menuSettings",
  title: "Meny",
  icon: List,
  options: {
    singleton: true,
  },
  fields: [
    linksField({
      name: "menu",
      title: "Meny",
      includeExternal: true,
      includeLinkGroup: true,
    }),
    linksField({
      name: "button",
      title: "Knapp",
      includeExternal: true,
      max: 1,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Meny",
      }
    },
  },
})
