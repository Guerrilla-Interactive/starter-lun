import type { InferType, TypeFromSelection } from "groqd"
import { q } from "groqd"

export const externalLinkObjectQuery = {
  _key: q.string(),
  _type: q.literal("externalLinkObject"),
  openBlank: q.boolean().nullable(),
  url: q.string().nullable(),
}

export type ExternalLinkObjectProps = TypeFromSelection<
  typeof externalLinkObjectQuery
>

export const internalLinkObjectQuery = {
  _key: q.string(),
  _type: q.literal("internalLinkObject"),
  link: q("internalLink")
    .deref()
    .grab$({
      _type: q.string(),
      slug: ["slug.current", q.string().nullable()],
    })
    .nullable(),
}

export type InternalLinkObjectProps = TypeFromSelection<
  typeof internalLinkObjectQuery
>

export const downloadLinkObjectQuery = {
  _key: q.string(),
  _type: q.literal("downloadLinkObject"),
  file: q("file.asset")
    .deref()
    .grab$({
      url: q.string().nullable(),
    })
    .nullable(),
}

export type DownloadLinkObjectProps = TypeFromSelection<
  typeof downloadLinkObjectQuery
>

export const portableTextQuery = (fieldName: string) => {
  return q(fieldName)
    .filter()
    .grab({
      _key: q.string().nullable(),
      _type: q.string().nullable(),
      style: q.string().optional().nullable(),
      listItem: q.string().optional().nullable(),
      level: q.number().optional().nullable(),
      children: q("children")
        .filter()
        .grab({
          _key: q.string(),
          _type: q.string(),
          marks: q.array(q.string()).nullable(),
          text: q.string(),
        })
        .nullable(),
      markDefs: q("markDefs")
        .filter()
        .select({
          "_type == 'internalLinkObject'": internalLinkObjectQuery,
          "_type == 'externalLinkObject'": externalLinkObjectQuery,
          "_type == 'downloadLinkObject'": downloadLinkObjectQuery,
        })
        .nullable(),
    })
    .nullable()
}

export type PortableTextProps = InferType<ReturnType<typeof portableTextQuery>>
