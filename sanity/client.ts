import { createClient } from "@sanity/client/stega"

import { apiVersion, dataset, projectId } from "@/sanity/env.client"

export const previewClient = (token: string) =>
  createClient({
    apiVersion: apiVersion,
    dataset: dataset,
    projectId: projectId,
    token,
    useCdn: false,
    ignoreBrowserTokenWarning: false,
    perspective: "previewDrafts",
    stega: {
      enabled: false,
      studioUrl: "/studio"
    }
  })

export const client = createClient({
  apiVersion: apiVersion,
  dataset: dataset,
  projectId: projectId,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published",
  stega: {
    enabled: false,
    studioUrl: "/studio"
  }
})
