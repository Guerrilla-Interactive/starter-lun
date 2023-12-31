"use client"

import type { PiecesSlugQuery } from "./(pieces-slug-core)/(pieces-slug-server)/pieces.slug-query"
import { MobileProductPage2 } from "./components/mobile-product-page-2/mobile-product-page.component-2"
import { VariantIdType } from "./(pieces-slug-core)/(pieces-slug-destination)/page"

export const PiecesSlugPage = ({ page, variant, pieceSlug }: { page: PiecesSlugQuery, variant: VariantIdType, pieceSlug: string }) => {
  // Display the image for the variant at the top!
  return (
    <>
      <MobileProductPage2 {...page} variant={variant} pieceSlug={pieceSlug} />
    </>
  )
}
