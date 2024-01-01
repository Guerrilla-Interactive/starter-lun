"use client"

import { NextStudio } from "next-sanity/studio"
import { StudioLayout, StudioProvider } from "sanity"
import { createGlobalStyle } from "styled-components"

import config from "@/sanity/sanity.config"

// const GlobalStyle = createGlobalStyle(({ theme }) => ({
// // Type validation fails. theme.sanity is undefined!
//   html: { backgroundColor: theme.sanity.color.base.bg },
// }))

export default function StudioPage() {
  return (
    <>
      <NextStudio config={config}>
        <StudioProvider config={config}>
          {/* 
            Enable only after fixing type validation of theme.sanity above!
          <GlobalStyle /> 
          */}
          <StudioLayout />
        </StudioProvider>
      </NextStudio>
    </>
  )
}

