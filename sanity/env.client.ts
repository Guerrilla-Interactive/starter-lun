import { clientEnv } from "@/env/client.mjs"

export const projectId = clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = clientEnv.NEXT_PUBLIC_SANITY_DATASET
export const apiVersion = clientEnv.NEXT_PUBLIC_SANITY_API_VERSION ?? "2023-12-26"
