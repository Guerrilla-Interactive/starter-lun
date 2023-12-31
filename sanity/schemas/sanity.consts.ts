import * as documents from "./documents"
import * as settings from "./settings"

export const BASE_STUDIO_PATH = "studio"

export const LINKABLE_DOC_TYPES = Object.values(documents)
  .filter((doc) => doc?.options?.linkable)
  .map((doc) => doc.name) as string[]

export const PREVIEW_DOC_TYPES = Object.values(documents)
  .filter((doc) => doc?.options?.previewable)
  .map((doc) => doc.name) as string[]

export const SINGLETON_DOC_TYPES = Object.values({ ...documents, ...settings })
  .filter((doc) => doc?.options?.singleton)
  .map((doc) => doc.name) as string[]

/* Put all reserved root slugs here, i.e. folder names under web/pages */
export const RESERVED_ROOT_PATHS: string[] = [BASE_STUDIO_PATH]
