"use client"
import { clientEnv } from "@/env/client.mjs"
import * as Fathom from "fathom-client"
import { useRouter } from "next/navigation"

import { useEffect } from "react"

export const useFathom = () => {
  /*  const router = useRouter()
  const fathomId = env.NEXT_PUBLIC_FATHOM_ID
  const sites = env.NEXT_PUBLIC_FATHOM_SITES

  useEffect(() => {
    if (!fathomId) return

    if (!sites) {
      console.warn("Fathom enabled but no sites defined")
      return
    }

    const sitesArray = sites.split(",")

    Fathom.load(fathomId, {
      includedDomains: sitesArray,
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }

    router.events.on("routeChangeComplete", onRouteChangeComplete)

    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [fathomId, sites, router.events]) */
}
