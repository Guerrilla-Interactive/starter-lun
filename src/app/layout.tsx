import "@/styles/globals.css"
import "@total-typescript/ts-reset"

import { TailwindIndicator } from "@/components/utils/tailwind-indicator.component"

interface RootLayoutProps {
  children: React.ReactNode
}

import "keen-slider/keen-slider.min.css"
import "blaze-slider/dist/blaze.css"

import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { draftMode } from "next/headers"

import { ClientWrapper } from "@/components/client-wrapper.component"
import { PreviewIndicator } from "@/components/utils/preview-indicator.component"
import { clientEnv } from "@/env/client.mjs"
import { cn } from "@/utils/cn.util"

import VisualEditing from "../components/sanity/visual-editing"
import {
  GlobalContextProvider,
} from "../context/global-context"
import { NextgenContextStatusPanel } from "../context/nextgen-context-status-panel/nextgen-context-status-panel"

const grotesk = localFont({
  src: [
    {
      path: "../fonts/grotesk/ft-system-grotesk-regular.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/grotesk/ft-system-grotesk-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-grotesk",
})

const arizona = localFont({
  src: [
    {
      path: "../fonts/arizona/abc-arizona-flare-thin.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../fonts/arizona/abc-arizona-flare-light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/arizona/abc-arizona-flare-regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-arizona",
})

export const metadata: Metadata = {
  metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL ? clientEnv.NEXT_PUBLIC_SITE_URL : "https://example.com"),
  applicationName: clientEnv.NEXT_PUBLIC_SITE_NAME,
  title: {
    template: `%s | ${clientEnv.NEXT_PUBLIC_SITE_NAME}`,
    default: clientEnv.NEXT_PUBLIC_SITE_NAME,
  },
  icons: [
    {
      rel: "apple-touch-icon",
      url: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "icon",
      url: "/favicon/favicon-32x32.png",
      sizes: "32x32",
      type: "image/png",
    },
    {
      rel: "icon",
      url: "/favicon/favicon-16x16.png",
      sizes: "16x16",
      type: "image/png",
    },
  ],
  /* manifest: "/favicon/site.webmanifest", */
  twitter: { card: "summary_large_image" },
}

export const viewport: Viewport = {
  themeColor: '#ffffff'
}



const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html
      className={cn(grotesk.variable, arizona.variable, `text-dark font-sans`)}
      lang={"no"}
    >
      <GlobalContextProvider>
        <body className="min-h-screen bg-lunnheim-ivory-yellow ">

          <ClientWrapper>{children}</ClientWrapper>
          {draftMode().isEnabled && <VisualEditing />}
          <TailwindIndicator />
          <PreviewIndicator />
          <NextgenContextStatusPanel />


        </body>

      </GlobalContextProvider>

    </html >
  )
}

export default RootLayout
