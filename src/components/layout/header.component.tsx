"use client"

import React from "react"
import type { MenuSettings } from "@/sanity/queries/settings/settings.query"

import {
  Section,
} from "../nextgen-core-ui"

const HeaderContent = (props: MenuSettings) => {
  return (
    <Section>

    </Section >
  )
}


export const Header = (props: MenuSettings) => {
  return (
    <header>
      <HeaderContent {...props} />
    </header>
  )
}
