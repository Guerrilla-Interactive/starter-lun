import { SanityImage } from "sanity-image"

import { clientEnv } from "@/env/client.mjs"
import type { ImageType } from "@/sanity/queries/utils/image.query"
import { cn } from "@/utils/cn.util"

type ImgProps = {
  image: ImageType
  width?: number
  height?: number
  sizes?: string
  className?: string
  eager?: boolean
  absoluteHotspot?: boolean
  disableLqip?: boolean // New property to control lqip
}

export const Img = ({
  image,
  width,
  height,
  sizes = "(min-width: 1300px) 800px, 100vw",
  className,
  eager = false,
  absoluteHotspot = false,
  disableLqip = false, // Default to false
}: ImgProps) => {
  const { _ref, hotspot, crop, asset, alt } = image ?? {}

  if (!_ref || !asset) return null

  const {
    metadata: { lqip },
  } = asset

  // Use lqip based on the disableLqip prop
  const preview = disableLqip ? undefined : lqip

  if (absoluteHotspot) {
    return (
      <figure
        className="relative h-full w-full object-cover"
        style={{
          objectPosition: hotspot
            ? `${hotspot?.x * 100}% ${hotspot?.y * 100}%`
            : "center",
        }}
      >
        <SanityImage
          id={_ref}
          projectId={clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID}
          dataset={clientEnv.NEXT_PUBLIC_SANITY_DATASET}
          width={width ?? undefined}
          height={height ?? undefined}
          mode="cover"
          hotspot={hotspot ?? undefined}
          crop={crop ?? undefined}
          preview={preview} // Changed to use the preview variable
          alt={alt ?? ""}
          sizes={sizes}
          loading={eager ? "eager" : "lazy"}
          className={cn(className)}
        />
      </figure>
    )
  }

  return (
    <SanityImage
      id={_ref}
      projectId={clientEnv.NEXT_PUBLIC_SANITY_PROJECT_ID}
      dataset={clientEnv.NEXT_PUBLIC_SANITY_DATASET}
      width={width ?? undefined}
      height={height ?? undefined}
      mode="cover"
      hotspot={hotspot ?? undefined}
      crop={crop ?? undefined}
      preview={preview} // Changed to use the preview variable
      alt={alt ?? ""}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={cn(className)}
    />
  )
}
