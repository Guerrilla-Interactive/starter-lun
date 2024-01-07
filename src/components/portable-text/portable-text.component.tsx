import {
  Heading,
  HeadingLevelType,
  HeadingSizeType,
} from "../layout/heading.component"
import { ReactNode } from "react"
import { PortableText as PortableTextComponent } from "@portabletext/react"
import type {
  DownloadLinkObjectProps,
  ExternalLinkObjectProps,
  InternalLinkObjectProps,
  PortableTextProps,
} from "./portable-field.query"
import { LinkResolver } from "../utils/link-resolver.component"
import { CaretRight } from "@phosphor-icons/react"
import { cn } from "@/src/utils/cn.util"
import { Icon } from "../utils/icon.component"
import { slugifyString } from "@/src/utils/slugify-string.util"

export type PortableTextOptions = {
  pSize?: string
  topHLevel?: HeadingLevelType
  topHSize?: HeadingSizeType
}

type PortableBlockNode = NonNullable<PortableTextProps>[number]
interface BlockComponentProps {
  children?: React.ReactNode
  node?: PortableBlockNode
}

const block = (options: PortableTextOptions) => {
  const { pSize, topHLevel, topHSize } = options ?? {}

  return {
    h2: ({ children, node }: BlockComponentProps) => {
      const id = slugifyString(node?.children?.[0]?.text ?? "")
      return (
        <Heading
          id={id}
          level={topHLevel ?? 2}
          size={topHSize ?? topHLevel ?? 2}
          className="mb-[0.5em] mt-[2em] first:mt-0 last:mb-0"
          divider
        >
          {children}
        </Heading>
      )
    },
    h3: ({ children, node }: BlockComponentProps) => {
      const id = slugifyString(node?.children?.[0]?.text ?? "")
      return (
        <Heading
          id={id}
          level={topHLevel ? ((topHLevel + 1) as HeadingLevelType) : 3}
          size={
            topHSize
              ? ((topHSize + 1) as HeadingSizeType)
              : topHLevel
                ? ((topHLevel + 1) as HeadingSizeType)
                : 3
          }
          className="mb-[0.5em] mt-[2em] first:mt-0 last:mb-0"
        >
          {children}
        </Heading>
      )
    },
    h4: ({ children }: BlockComponentProps) => (
      <Heading
        level={topHLevel ? ((topHLevel + 2) as HeadingLevelType) : 4}
        size={
          topHSize
            ? ((topHSize + 2) as HeadingSizeType)
            : topHLevel
              ? ((topHLevel + 2) as HeadingSizeType)
              : 4
        }
        className="mb-[0.5em] mt-[2em] first:mt-0 last:mb-0"
      >
        {children}
      </Heading>
    ),
    normal: ({ children }: BlockComponentProps) => {
      if (
        !children ||
        !(children as any).some((c: any) => c.props?.text || c.length > 0)
      )
        return null // Don't render empty p tags

      return <p className={cn(pSize, "mb-[1em] last:mb-0")}>{children}</p>
    },
  }
}

const types = () => {
  return {}
}

const marks = {
  externalLinkObject: ({
    children,
    value,
  }: {
    children: ReactNode
    value?: ExternalLinkObjectProps
  }) => {
    const { url, openBlank } = value ?? {}

    if (!url) return <>{children}</>

    return (
      <LinkResolver linkType="external" link={{ url, openBlank }}>
        <span className="border-dark/50 group-hover:border-dark/100 border-b">
          {children}
        </span>
      </LinkResolver>
    )
  },
  internalLinkObject: ({
    children,
    value,
  }: {
    children: ReactNode
    value?: InternalLinkObjectProps
  }) => {
    const { link } = value ?? {}
    const { slug, _type } = link ?? {}

    if (!link || (!slug && !_type)) return <>{children}</>

    return (
      <LinkResolver linkType="internal" link={link}>
        <span className="border-dark/50 group-hover:border-dark/100 border-b">
          {children}
        </span>
      </LinkResolver>
    )
  },
  downloadLinkObject: ({
    children,
    value,
  }: {
    children: ReactNode
    value?: DownloadLinkObjectProps
  }) => {
    const { file } = value ?? {}

    if (!file) return <>{children}</>

    return (
      <LinkResolver linkType="download" link={{ url: file.url }}>
        <span className="border-dark/50 group-hover:border-dark/100 border-b">
          {children}
        </span>
      </LinkResolver>
    )
  },
}

const list = (options: PortableTextOptions) => {
  const { pSize } = options ?? {}

  return {
    bullet: ({ children }: BlockComponentProps) => (
      <ul
        className={cn(
          pSize,
          "mb-[2.2em] mt-[1em] flex flex-col gap-y-[0.5em] first:mt-0 last:mb-0"
        )}
      >
        {children}
      </ul>
    ),
    number: ({ children }: BlockComponentProps) => (
      <ol
        className={cn(
          pSize,
          "mb-[2.2em] mt-[1em] flex flex-col gap-y-[0.5em] first:mt-0 last:mb-0"
        )}
      >
        {children}
      </ol>
    ),
  }
}

const listItem = {
  bullet: ({ children }: BlockComponentProps) => (
    <li className="flex gap-[0.3em]">
      <Icon
        icon={CaretRight}
        weight="bold"
        className="ml-[-0.2em] mt-[0.5em] shrink-0 text-[0.8em] opacity-60"
      />
      <div>{children}</div>
    </li>
  ),
  number: ({ children }: BlockComponentProps) => (
    <li className="flex list-disc gap-[0.5em]">
      <span>{children}</span>
    </li>
  ),
}

const components = (options: PortableTextOptions) => {
  return {
    types: types(),
    marks,
    block: block(options),
    list: list(options),
    listItem,
  }
}

export const PortableText = ({
  content,
  className,
  options = {},
}: {
  content?: PortableTextProps
  className?: string
  options?: PortableTextOptions
}) => {
  if (!content) return null

  return (
    <div className={cn(className)}>
      <PortableTextComponent components={components(options)} value={content} />
    </div>
  )
}
