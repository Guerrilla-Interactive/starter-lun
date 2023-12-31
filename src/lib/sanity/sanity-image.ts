import imageUrlBuilder from "@sanity/image-url"
import type { Image, ImageUrlBuilder } from "sanity"

import { dataset, projectId } from "@/sanity/env.client"

const imageBuilder = imageUrlBuilder({
  projectId: projectId || "",
  dataset: dataset || "",
}) as ImageUrlBuilder

export const urlForImage = (source: Image) => {
  return imageBuilder?.image(source).auto("format").fit("max")
}
