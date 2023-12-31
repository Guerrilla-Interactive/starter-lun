// This is a map from sanity schema type to its correponding page path
// For example: category types in sanity are rendered in the page
// categories/[slug] and that piece detail pages are available in
// pieces/[slug]. Note "piece" type -> "pieces"/[slug]. 
// Also note that the keys of this map are the sanity types of which
// sitemap is generated (filtered some). 
export const PATHS = {
  page: "",
  frontPage: "",
  piece: "pieces",
  piecesIndex: "pieces",
  category: "categories",
  categoriesIndex: "categories",
} as const

export function resolvePath(type: string, slug?: string | null) {
  // eslint-disable-next-line
  // @ts-ignore
  const path = PATHS[type]

  if (!path) {
    return slug ? `/${slug}` : "/"
  }

  return `/${path}${slug ? `/${slug}` : ""}`
}
