import { createClient } from "@sanity/client/stega"

import { clientEnv } from "@/env/client.mjs"

export const previewClient = (token: string) =>
  createClient({
    apiVersion: clientEnv.NEXT_PUBLIC_SANITY_API_VERSION,
    dataset: clientEnv.NEXT_PUBLIC_SANITY_DATASET,
    projectId: clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID,
    token,
    useCdn: false,
    ignoreBrowserTokenWarning: true,
    perspective: "previewDrafts",
    stega: {
      enabled: false,
      studioUrl: "/studio"
    }
  })
