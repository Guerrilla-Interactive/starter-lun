"use client"

import type { CSSProperties } from "react"
import React, { forwardRef, useEffect, useState } from "react"
import { RoundedDivider } from "../../sections/sections/hero-section/(parts)/rounded-divider.component"
import { cn } from "@/src/utils/cn.util"
import { motion } from "framer-motion"
import { useGlobalContext } from "@/src/context/global-context"

interface VerticalSpaceProps {
  height?: number | string
  className?: string
  style?: CSSProperties
  animated?: boolean
}

const VerticalSpace = forwardRef<HTMLDivElement, VerticalSpaceProps>(
  (
    {
      height = "20px",
      className = "relative",
      style = {},
      animated = false,
      ...rest
    },
    ref
  ) => {
    const { globalData, activateVerticalSpace } = useGlobalContext()
    const [currentHeight, setCurrentHeight] = useState<string>(
      typeof height === "number" ? `${height}px` : height
    )

    useEffect(() => {
      // Check if animation is enabled and VerticalSpace has not been activated yet
      if (animated && !globalData.verticalSpaceActivated) {
        // Start the animation with a short delay
        const timeoutId = setTimeout(() => {
          setCurrentHeight(typeof height === "number" ? `${height}px` : height)
          // Activate the VerticalSpace in the context
          activateVerticalSpace()
        }, 300)

        return () => clearTimeout(timeoutId) // Clear the timeout on unmount
      }
    }, [
      height,
      animated,
      globalData.verticalSpaceActivated,
      activateVerticalSpace,
    ])

    const combinedStyles: React.CSSProperties = {
      height: currentHeight,
      transition: animated ? "height 0.9s ease-in-out" : undefined,
      ...style,
    }

    return (
      <motion.div
        ref={ref}
        initial={{
          height: globalData.verticalSpaceActivated ? currentHeight : 0,
        }}
        animate={{ height: currentHeight }}
        exit={{ height: 0 }}
        transition={{ duration: 0.9 }}
        className={cn(
          className,
          "h-full w-full max-w-[100vw] overflow-hidden overflow-x-hidden"
        )}
        style={combinedStyles}
        {...rest}
      >
        <RoundedDivider bottom />
      </motion.div>
    )
  }
)

VerticalSpace.displayName = "VerticalSpace"
export default VerticalSpace
