import React, { useState, useEffect } from "react"
import { cn } from "@/src/utils/cn.util"
import { useGlobalContext } from "@/src/context/global-context"
import { Absolute } from "@/src/components/nextgen-core-ui"

interface RoundedDividerProps {
  className?: string
  verticalFlip?: boolean
  top?: boolean
  bottom?: boolean
  color?: string
}

export const RoundedDivider: React.FC<RoundedDividerProps> = ({
  top,
  bottom,
  verticalFlip,
  className,
  color,
}) => {
  const { globalData } = useGlobalContext()

  const originalSvgWidth = 655
  const originalSvgHeight = 33
  const aspectRatio = originalSvgHeight / originalSvgWidth
  const isBrowser = typeof window !== "undefined"

  const [screenWidth, setScreenWidth] = useState<number>(
    globalData.screenData.screenWidth ?? originalSvgWidth
  )
  const [effectiveWidth, setEffectiveWidth] = useState<number>(
    globalData.screenData.screenWidth ?? originalSvgWidth
  )
  const [heightMultiplier, setHeightMultiplier] = useState(0.7)
  const [offset, setOffset] = useState(5)

  useEffect(() => {
    if (!isBrowser) return
    setScreenWidth(window.innerWidth)
    setEffectiveWidth(Math.max(window.innerWidth, originalSvgWidth))

    const handleResize = () => {
      setScreenWidth(window.innerWidth)
      setEffectiveWidth(Math.max(window.innerWidth, originalSvgWidth))
      if (window.innerWidth <= 768) {
        // Example breakpoint for mobile devices
        setHeightMultiplier(0.5)
        setOffset(1)
      } else {
        setHeightMultiplier(0.5)
        setOffset(1)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Call once on mount to set initial values

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [isBrowser])

  if (!screenWidth || !effectiveWidth) return null

  const computedHeight = effectiveWidth * aspectRatio * heightMultiplier
  const style = {
    height: `${computedHeight}px`,
    display: "block",
    marginTop: bottom ? "auto" : "6px",
    marginBottom: !bottom ? "auto" : verticalFlip ? "6px" : "-6px",
    top: top ? `-${computedHeight + offset}px` : undefined,
    bottom:
      bottom && !verticalFlip ? `${offset}px` : `-${computedHeight + offset}px`,
  }

  return (
    <Absolute
      style={style}
      className={cn(
        verticalFlip && "rotate-180",
        className && `${className}`,
        "absolute z-[-1] w-[99vw]"
      )}
    >
      <svg
        style={{
          height: `${computedHeight}px`,
          width: `${effectiveWidth * 2}px`,
          maxWidth: "100vw",
        }}
        viewBox={`0 0 ${effectiveWidth} ${computedHeight}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M0 ${computedHeight - 0.8804}C0 ${computedHeight - 0.8804} -${effectiveWidth * 0.000475
            } ${computedHeight * 0.150424} ${effectiveWidth / 2
            } 0.27938C${effectiveWidth} -${computedHeight * 0.126134
            } ${effectiveWidth} ${computedHeight - 0.8804} ${effectiveWidth} ${computedHeight - 0.8804
            }V${computedHeight}H0V${computedHeight - 0.8804}Z`}
          fill={color ? `var(--${color})` : "var(--lunnheim-ivory-yellow)"}
        />
      </svg>
    </Absolute>
  )
}
