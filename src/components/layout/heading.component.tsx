import type { ReactNode } from "react"
import Balancer from "react-wrap-balancer"

import { cn } from "@/utils/cn.util"
import { hyphenate } from "@/utils/hyphenate.util"

export type HeadingLevelType = 1 | 2 | 3 | 4 | 5 | 6
export type HeadingSizeType = HeadingLevelType

type HeadingType = {
  level?: HeadingLevelType
  size?: HeadingSizeType
  className?: string
  children?: ReactNode | string
  divider?: boolean
  id?: string
  hypthens?: boolean
}

export const Heading = ({
  level = 2,
  size,
  className,
  children,
  divider,
  id,
  hypthens,
}: HeadingType) => {
  if (!children) return null

  size = size ?? level

  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

  const styles = cn(
    getSize(size),
    "font-medium",
    divider && " border-b border-dark/10 pb-[0.3em]",
    className
  )

  return (
    <Tag id={id} className={styles}>
      {size === 1 ? (
        <Balancer>
          <HeadingInner hypthens={hypthens} size={size}>
            {children}
          </HeadingInner>
        </Balancer>
      ) : (
        <HeadingInner hypthens={hypthens} size={size}>
          {children}
        </HeadingInner>
      )}
    </Tag>
  )
}

const HeadingInner = ({
  children,
  size,
  hypthens,
}: Pick<HeadingType, "children" | "size" | "hypthens">) => {
  let title = children

  if (
    (typeof children === "string" && size && size < 2) ||
    (typeof children === "string" && hypthens)
  ) {
    title = hyphenate(children, 10)
  }

  return <>{title}</>
}

const getSize = (size: HeadingSizeType) => {
  switch (size) {
    case 1:
      return "text-4xl lg:text-5xl"
    case 2:
      return "text-3xl md:text-4xl"
    case 3:
      return "text-2xl xl:text-3xl"
    case 4:
      return "text-xl xl:text-2xl"
    case 5:
      return "text-base xl:text-lg"
    default:
      return "text-xs xl:text-sm uppercase"
  }
}

export const H1 = ({
  size = 1,
  children,
  ...props
}: Omit<HeadingType, "level">) => (
  <Heading level={1} size={size} {...props}>
    {children}
  </Heading>
)

export const H2 = ({
  size = 2,
  children,
  ...props
}: Omit<HeadingType, "level">) => (
  <Heading level={2} size={size} {...props}>
    {children}
  </Heading>
)

export const H3 = ({
  size = 3,
  children,
  ...props
}: Omit<HeadingType, "level">) => (
  <Heading level={3} size={size} {...props}>
    {children}
  </Heading>
)

export const H4 = ({
  size = 4,
  children,
  ...props
}: Omit<HeadingType, "level">) => (
  <Heading level={4} size={size} {...props}>
    {children}
  </Heading>
)

export const H5 = ({
  size = 5,
  children,
  ...props
}: Omit<HeadingType, "level">) => (
  <Heading level={5} size={size} {...props}>
    {children}
  </Heading>
)

export const H6 = ({
  size = 6,
  children,
  ...props
}: Omit<HeadingType, "level">) => (
  <Heading level={6} size={size} {...props}>
    {children}
  </Heading>
)
