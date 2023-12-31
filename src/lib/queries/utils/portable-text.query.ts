import type { InferType, TypeFromSelection } from "groqd"
import { q } from "groqd"

import { imageQuery } from "./image.query"
import { linksSelect } from "./links.query"

const portableInnerQuery = {
  _key: q.string(),
  _type: q.string(),
  style: q.string().optional(),
  listItem: q.string().optional(),
  level: q.number().optional(),
  children: q("children")
    .filter()
    .grab$({
      _key: q.string(),
      _type: q.string(),
      marks: q.array(q.string()).optional(),
      text: q.string().optional(),
    })
    .nullable(),
  markDefs: q("markDefs").filter().select(linksSelect).nullable(),
}

const imageSectionQuery = {
  _key: q.string(),
  _type: q.literal("imageSection"),
  image: imageQuery("image"),
}

export type ImageSectionProps = TypeFromSelection<typeof imageSectionQuery>

export const portableTextQuery = (fieldName: string) => {
  return q(fieldName).filter().grab$(portableInnerQuery).nullable()
}

export const portableTextQueryFull = (fieldName: string) => {
  return q(fieldName)
    .filter()
    .grab$(portableInnerQuery, {
      "_type == 'imageSection'": imageSectionQuery,
    })
    .nullable()
}

export type PortableTextProps = InferType<
  ReturnType<typeof portableTextQueryFull>
>
