"use client"

import type { CSSProperties } from "react"
import React, { forwardRef, useEffect, useState } from "react"

interface HeroContentProps {
  height?: number | string
  className?: string
  style?: CSSProperties
  animated?: boolean
  children?: React.ReactNode
}
const HeroContent = forwardRef<HTMLDivElement, HeroContentProps>(
  (
    {
      height = "90vh",
      className = "",
      style = {},
      animated = false,
      children,
      ...rest
    },
    ref
  ) => {
    const [currentHeight, setCurrentHeight] = useState<string>(
      animated ? "0px" : typeof height === "number" ? `${height}px` : height
    )
    const [opacity, setOpacity] = useState<number>(0) // Set initial opacity to 0

    useEffect(() => {
      if (animated) {
        // Set the height
        const timeoutHeight = setTimeout(() => {
          setCurrentHeight(typeof height === "number" ? `${height}px` : height)
        }, 0)

        // Fade in the component by setting opacity to 1
        const timeoutOpacity = setTimeout(() => {
          setOpacity(1)
        }, 0)

        return () => {
          clearTimeout(timeoutHeight)
          clearTimeout(timeoutOpacity)
        }
      } else {
        // If not animated, the content should be fully visible
        setOpacity(1)
      }
    }, [height, animated])
    const combinedStyles: React.CSSProperties = {
      ...style,
      height: animated ? currentHeight : height,
      opacity: opacity, // Apply dynamic opacity
      transition: `opacity 3s ${animated ? ", height 0.365s ease-in" : ""}`, // Transition for opacity and optionally height
    }

    return (
      <div ref={ref} className={className} style={combinedStyles} {...rest}>
        {children}
      </div>
    )
  }
)

HeroContent.displayName = "HeroContent"
export default HeroContent
