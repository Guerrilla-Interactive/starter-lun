import type { Selection, TypeFromSelection } from "groqd"
import { q } from "groqd"

export const internalLinkQuery = {
  linkType: ["'internal'", q.literal("internal")],
  link: q("internalLink")
    .deref()
    .grab({
      title: [
        "coalesce(^.customTitle, title)",
        q.string().optional().nullable(),
      ],
      _type: q.string().nullable(),
      slug: ["slug.current", q.string().optional().nullable()],
    })
    .nullable(),
} satisfies Selection

export type InternalLinkProps = TypeFromSelection<typeof internalLinkQuery>

export const externalLinkQuery = {
  linkType: ["'external'", q.literal("external")],
  link: q("")
    .grab({
      title: ["coalesce(customTitle, url)", q.string().optional().nullable()],
      url: q.string().nullable(),
      openBlank: q.boolean().optional().nullable(),
    })
    .nullable(),
} satisfies Selection

export type ExternalLinkProps = TypeFromSelection<typeof externalLinkQuery>

export const downloadLinkQuery = {
  linkType: ["'download'", q.literal("download")],
  link: q("file.asset")
    .deref()
    .grab({
      title: [
        "coalesce(^.customTitle, originalFilename)",
        q.string().optional().nullable(),
      ],
      url: ["url", q.string().nullable()],
    })
    .nullable(),
} satisfies Selection

export type DownloadLinkProps = TypeFromSelection<typeof downloadLinkQuery>

export const linkGroupQuery = {
  linkType: ["'linkGroup'", q.literal("linkGroup")],
  title: q.string().nullable(),
  items: q("items")
    .filter()
    .select(
      q.select({
        "_type == 'internalLinkObject'": {
          _key: q.string(),
          ...internalLinkQuery,
        },
        "_type == 'externalLinkObject'": {
          _key: q.string(),
          ...externalLinkQuery,
        },
        default: { _key: q.string() },
      })
    )
    .nullable(),
} satisfies Selection

export type LinkGroupProps = TypeFromSelection<typeof linkGroupQuery>

// Custom type for Anchor Link, not (yet) available in studio
export type AnchorLinkProps = {
  linkType: "anchor"
  link: {
    id: string
    title?: string
  }
}

type UnkownType = {
  linkType: "unknown"
}

type LinksSelectOptions = {
  internal?: boolean
  external?: boolean
  linkGroup?: boolean
}

export const linksGroupSelect = q.select({
  "_type == 'linkGroup'": { _key: q.string(), ...linkGroupQuery },
  "_type == 'externalLinkObject'": {
    _key: q.string(),
    ...externalLinkQuery,
  },
  "_type == 'internalLinkObject'": {
    _key: q.string(),
    ...internalLinkQuery,
  },
  default: {
    linkType: q.literal("unknown"),
    _key: q.string(),
  },
})

export const linkSelect = {
  "_type == 'internalLinkObject'": internalLinkQuery,
  "_type == 'externalLinkObject'": externalLinkQuery,
  "_type == 'downloadLinkObject'": downloadLinkQuery,
}

export const linksSelect = q.select({
  "_type == 'externalLinkObject'": {
    _key: q.string(),
    _type: q.literal("externalLinkObject"),
    ...externalLinkQuery,
  },
  "_type == 'internalLinkObject'": {
    _key: q.string(),
    _type: q.literal("internalLinkObject"),
    ...internalLinkQuery,
  },
  "_type == 'downloadLinkObject'": {
    _key: q.string(),
    _type: q.literal("downloadLinkObject"),
    ...downloadLinkQuery,
  },
  default: {
    linkType: q.literal("unknown"),
    link: q("link").grab({
      title: q.string().nullable(),
    }),
    _key: q.string(),
  },
})

export type LinkProps =
  | InternalLinkProps
  | ExternalLinkProps
  | DownloadLinkProps
  | UnkownType
export type LinkPropsWithGroup = LinkProps | LinkGroupProps
