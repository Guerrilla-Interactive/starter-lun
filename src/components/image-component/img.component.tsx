"use client"

import { SanityImage } from "sanity-image"

import { clientEnv } from "@/env/client.mjs"
import type { ImageType } from "@/lib/queries/utils/image.query"
import { cn } from "@/utils/cn.util"

type ImgProps = {
  image: ImageType
  width?: number
  height?: number
  sizes?: string
  className?: string
  eager?: boolean
  absoluteHotspot?: boolean
  disableLqip?: boolean
}

export const Img = ({
  image,
  width,
  height,
  sizes = "(min-width: 1300px) 800px, 100vw",
  className,
  eager = false,
  absoluteHotspot = false,
  disableLqip = false,
}: ImgProps) => {
  const { _ref, hotspot, crop, asset, alt } = image ?? {}

  if (!_ref || !asset) return null

  const {
    metadata: { lqip },
  } = asset

  if (absoluteHotspot) {
    const { top = 0, bottom = 0, left = 0, right = 0 } = crop ?? {}

    const adjustedHotspotX = hotspot
      ? hotspot.x * (1 - left - right) + left
      : 0.5

    const adjustedHotspotY = hotspot
      ? hotspot.y * (1 - top - bottom) + top
      : 0.5

    return (
      <figure
        className="relative h-full w-full object-cover"
        style={{
          objectPosition: `${adjustedHotspotX * 100}% ${adjustedHotspotY * 100
            }%`,
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
          //crop={crop ?? undefined}
          preview={disableLqip ? undefined : lqip}
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
      preview={disableLqip ? undefined : lqip}
      alt={alt ?? ""}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      className={cn(className)}
    />
  )
}
