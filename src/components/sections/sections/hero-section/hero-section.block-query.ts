import type { Selection, TypeFromSelection } from "groqd";
import { q } from "groqd"

import { internalLinkQuery } from "@/sanity/queries/navigation/links.query"
import { imageQuery } from "@/sanity/queries/utils/image.query"

export const heroSectionObjectQuery = {
  title: q.string().nullable(),
  subtitle: q.string().nullable(),
  hideTitle: q.boolean().nullable(),
  image: imageQuery("image").nullable(),
  links: q("links")
    .filter()
    .grab({
      ...internalLinkQuery,
    })
    .nullable(),
  // Add your query fields here
} satisfies Selection

export type HeroSectionObjectQuery = typeof heroSectionObjectQuery

export const dimensionValue = {
  amount: q.number(),
  unit: q.string(),
}

export const heroSectionBlockQuery = {
  title: q.string(),
  minHeight: q.object({
    ...dimensionValue,
  }),
  maxHeight: q.object({
    ...dimensionValue,
  }),
} satisfies Selection

export type HeroSectionBlockProps = TypeFromSelection<
  typeof heroSectionBlockQuery
>
