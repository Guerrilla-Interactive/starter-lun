import { internalLinkQuery } from "@/src/lib/queries/navigation/links.query"
import { imageQuery } from "@/src/lib/queries/utils/image.query"
import { q, Selection, TypeFromSelection } from "groqd"

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
