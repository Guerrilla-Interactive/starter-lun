import { MetadataProps } from "@/sanity/queries/utils/metadata.query"
import { urlForImage } from "@/sanity/sanity-image"
import type { Metadata } from "next"
import type { Image } from "sanity"

export const generatePageMeta = (
  metadata: MetadataProps | undefined
): Metadata => {
  const title = metadata?.title || metadata?.seoSettings?.metadata?.title
  const desc = metadata?.desc || metadata?.seoSettings?.metadata?.desc
  const graphic = metadata?.graphic || metadata?.seoSettings?.metadata?.graphic

  const imageUrl = graphic?.asset
    ? urlForImage(graphic as Image)
      .width(1200)
      .height(630)
      .url()
    : null

  const metaTitle = title ?? undefined
  const metaDesc = desc ?? undefined

  return {
    title: metaTitle,
    description: metaDesc,
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      images: imageUrl
        ? [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: graphic?.alt ?? "",
          },
        ]
        : undefined,
    },
  }
}
