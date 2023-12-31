"use client"

import Link from "next/link"
import type { ForwardedRef, MouseEvent, ReactNode } from "react"
import { forwardRef, useEffect, useState } from "react"

import { resolvePath } from "@/lib/navigation/resolve-path.util"
import type {
  AnchorLinkProps,
  DownloadLinkProps,
  ExternalLinkProps,
  InternalLinkProps,
  LinkProps,
} from "@/lib/queries/navigation/links.query"
import { cn } from "@/utils/cn.util"

type LinkResolverProps = {
  className?: string
  children: ReactNode
  hideIcon?: boolean
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  blank?: boolean
  linkStyle?: string
}

export const LinkResolver = forwardRef<
  HTMLAnchorElement,
  LinkResolverProps & LinkProps
>((props, ref) => {
  const { children, linkType, linkStyle = "" } = props

  switch (linkType) {
    case "internal":
      return (
        <InternalLink forwardedRef={ref} {...props} linkStyle={linkStyle}>
          {children}
        </InternalLink>
      )
    case "external":
    case "download":
      return (
        <ExternalLink forwardedRef={ref} {...props} linkStyle={linkStyle}>
          {children}
        </ExternalLink>
      )
    default:
      return <pre>linkType {linkType} missing</pre>
  }
})

const InternalLink = ({
  forwardedRef,
  link,
  className,
  children,
  onClick,
  blank,
  linkStyle,
}: InternalLinkProps &
  LinkResolverProps & { forwardedRef: ForwardedRef<HTMLAnchorElement> }) => {
  const { _type, slug } = link ?? {}

  if (!_type && !slug) return <>{children}</>

  return (
    <Link
      rel={blank ? "noreferrer" : undefined}
      target={blank ? "_blank" : undefined}
      ref={forwardedRef}
      href={resolvePath(_type ?? "", slug)}
      className={cn("group", className, linkStyle)}
    >
      {children}
    </Link>
  )
}

const AnchorLink = ({
  forwardedRef,
  link,
  className,
  children,
  onClick,
  linkStyle,
}: AnchorLinkProps &
  LinkResolverProps & { forwardedRef: ForwardedRef<HTMLAnchorElement> }) => {
  const { id } = link ?? {}

  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setTarget(document.getElementById(id))
  }, [id])

  const handleAnchorLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (!target) return
    target.scrollIntoView({ behavior: "smooth" })
  }

  if (!id) return <>{children}</>

  return (
    <Link
      ref={forwardedRef}
      onClick={(e) => {
        handleAnchorLinkClick(e)
        onClick && onClick(e)
      }}
      href={`#${id}`}
      className={cn("group", className, linkStyle)}
    >
      {children}
    </Link>
  )
}

const ExternalLink = ({
  forwardedRef,
  link,
  className,
  children,
  hideIcon,
  linkType,
  onClick,
  blank,
  linkStyle,
}: (ExternalLinkProps | DownloadLinkProps) &
  LinkResolverProps & {
    forwardedRef: ForwardedRef<HTMLAnchorElement>
    linkType: "external" | "download"
  }) => {
  let { url } = link ?? {}

  if (!url) return <>{children}</>

  const openBlank = (linkType === "external" && link?.openBlank) || blank
  const isType = (type: string) => {
    return url?.startsWith(type)
  }
  const breakLink =
    isType("mailto") ||
    (typeof children === "string" && children?.startsWith("http"))

  if (isType("tel")) {
    url = url.replaceAll(" ", "")
  }

  return (
    <a
      ref={forwardedRef}
      href={url}
      rel={openBlank ? "noreferrer" : undefined}
      target={openBlank ? "_blank" : undefined}
      className={cn("group", className, breakLink && "break-all", linkStyle)}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

LinkResolver.displayName = "LinkResolver"
