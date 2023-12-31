import type { Selection } from "groqd"
import { q } from "groqd"
import type { MetadataRoute } from "next"

import { clientEnv } from "@/env/client.mjs"
import { PATHS, resolvePath } from "@/lib/navigation/resolve-path.util"
import { tClient } from "@/lib/sanity/groqd-client"
import { piecesIndexQuery } from "./(site)/pieces/(index)/(pieces-index-core)/(pieces-index-server)/pieces.index-query"

const sitemapFields = {
  _updatedAt: q.string(),
  _type: q.string(),
  slug: ["slug.current", q.string().nullable()],
} satisfies Selection

// Get the keys from the PATHS object and use them as sitemapTypes
const sitemapTypes = Object.keys(PATHS).filter((type) => type !== "frontPage")

const sitemapQuery = q("").grab({
  pages: q("*")
    .filter("_type in $sitemapTypes && !(_id in path('drafts.**'))")
    .grab(sitemapFields)
    .nullable(),
  frontPage: q("*")
    .filter("_type == 'siteSettings' && !(_id in path('drafts.**'))")
    .slice(0)
    .grab({
      frontPage: q("frontPage").deref().grab(sitemapFields).nullable(),
    })
    .nullable(),
})

export const getSitemap = async () => {
  const sitemap = await tClient(sitemapQuery, { sitemapTypes })
  return {
    ...sitemap,
    frontPage: sitemap?.frontPage?.frontPage,
  }
}

async function createSitemap(): Promise<MetadataRoute.Sitemap> {
  const sanitizedUrl: any = sanitizeUrl(clientEnv.NEXT_PUBLIC_SITE_URL ?? "")
  const sitemapData = await getSitemap()
  const piecesData = (await tClient(piecesIndexQuery))?.pieces
  const sitemap: MetadataRoute.Sitemap = []

  // assuming sitemapData.pages and sitemapData.frontPage are the data you need
  const pages = sitemapData.pages
  const frontPage = sitemapData.frontPage

  // Add frontPage to the sitemap
  if (frontPage) {
    sitemap.push({
      url: `${clientEnv.NEXT_PUBLIC_SITE_URL}`, // replace 'acme.com' with your actual domain
      lastModified: frontPage._updatedAt,
    })
  }

  function sanitizeUrl(url: string) {
    if (url.endsWith("/")) {
      return url.slice(0, -1) // removes the last character if it's a '/'
    }
    return url
  }


  // Add pieces variants to sitemap
  piecesData?.forEach(piece => {
    piece.variants?.forEach(variant => {
      const variantPage = {
        url: `${sanitizedUrl}${resolvePath(piece._type, piece.slug)}/${variant.slug}`,
        lastModified: piece._updatedAt,
      }
      sitemap.push(variantPage)
    })
  })


  // Add all other pages to the sitemap
  pages?.forEach((page) => {
    sitemap.push({
      url: `${sanitizedUrl}${resolvePath(page._type, page.slug)}`,
      lastModified: page._updatedAt,
    })
  })

  return sitemap
}

export default createSitemap
