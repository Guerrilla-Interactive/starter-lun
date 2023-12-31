"use client"

import type { Icon as PhosphorIcon, IconWeight } from "@phosphor-icons/react"
import * as icons from "@phosphor-icons/react"
import type { RefAttributes } from "react"

import { kebabToPascal } from "@/utils/string.util"

// UNIFORM PHOSPHOR ICONS
const DEFAULT_ICON_WEIGHT = "regular"

// Function for studio (to avoid having to *.tsXXX)
export const setIcon = (icon: IconType | string) => {
  if (!icon) return null

  let Icon = icon

  if (typeof icon === "string") {
    Icon = iconCompFromString(icon)
  }

  if (!Icon) return null

  // eslint-disable-next-line react/display-name
  return () => <Icon weight={DEFAULT_ICON_WEIGHT} />
}

// React component for front-end
export const Icon = ({
  icon,
  weight = DEFAULT_ICON_WEIGHT,
  className,
  size,
}: {
  icon: IconType | string
  weight?: IconWeight
  className?: string
  size?: number
}) => {
  let Icon = icon

  if (typeof icon === "string") {
    Icon = iconCompFromString(icon)
  }

  if (!Icon) return null

  return <Icon weight={weight} className={className} size={size} />
}

// Retrieves phosphor icon from string
// e.g. "file-arrow-down" -> "FileArrowDown" component
const iconCompFromString = (iconName: string): IconType => {
  const iconCompName = kebabToPascal(iconName)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const Icon = icons[iconCompName]
  return Icon
}

export type IconType = PhosphorIcon & RefAttributes<SVGSVGElement>
