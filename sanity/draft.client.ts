import { createClient } from "@sanity/client/stega"
import { sanityAPIToken } from "./token"
import { apiVersion, dataset, projectId } from "@/sanity/env.client"

export const draftClient = createClient({
  apiVersion: apiVersion,
  dataset: dataset,
  projectId: projectId,
  useCdn: false,
  perspective: "previewDrafts",
  token: sanityAPIToken,
  stega: {
    enabled: false,
    studioUrl: "/studio"
  }
})

