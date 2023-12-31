"use client"

import React, { useState, useEffect, useMemo, useCallback } from "react"
import "tailwindcss/tailwind.css"
import { Absolute, FlexCol, FlexRow, Relative } from "../nextgen-core-ui"
import { useGlobalContext } from "@/src/app/context/global-context"

interface ImageFrameCalculatorProps {
  initialWidth?: number
  initialHeight?: number
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timerId: NodeJS.Timeout | null = null
  return (...args: any[]) => {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const ImageFrameCalculator: React.FC<ImageFrameCalculatorProps> = ({
  initialWidth = 70,
  initialHeight = 40,
}) => {

  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(initialHeight)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetWidth = useCallback(debounce(setWidth, 0.1), [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetHeight = useCallback(debounce(setHeight, 0.1), [])

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetWidth(Number(event.target.value))
  }

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetHeight(Number(event.target.value))
  }

  const { addToCart } = useGlobalContext()

  const handleAddToCart = () => {
    addToCart({
      description: `Image Frame ${width}x${height} cm`,
      width,
      height,
    } as any)
  }

  return (
    <FlexCol className="flex flex-col items-center ">
      <DimensionsBox width={width} height={height} />
      <div className="mt-4 flex">
        <label className="mr-2">Width (cm):</label>
        <input
          type="range"
          min="60"
          max="200"
          onChange={handleWidthChange}
          className="slider"
        />
      </div>
      <div className="mt-2 flex">
        <label className="mr-2">Height (cm):</label>
        <input
          type="range"
          min="60"
          max="200"
          onChange={handleHeightChange}
          className="slider"
        />
      </div>
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={handleAddToCart}
      >
        Add to Cart
      </button>
    </FlexCol>
  )
}

interface DimensionsBoxProps {
  height: number
  width: number
}

export function DimensionsBox(props: DimensionsBoxProps) {
  const { width, height } = props
  const { globalData, setGlobalData, addToCart } = useGlobalContext()
  const screenWidth = globalData.screenData.screenWidth ?? 0
  const { calculatedWidth, fixedHeight } = useMemo(() => {
    let fixedHeight = screenWidth > 1400 ? 400 : 200
    const maxWidth = screenWidth > 1400 ? 1400 : screenWidth - screenWidth * 0.1
    let calculatedWidth = (width / height) * fixedHeight

    if (calculatedWidth > maxWidth) {
      calculatedWidth = maxWidth
      fixedHeight = maxWidth / (width / height)
    }

    return { calculatedWidth, fixedHeight }
  }, [screenWidth, width, height])
  return (<FlexCol
    style={{
      height: fixedHeight,
      border: "5px solid #c0a080",
      borderRadius: "10px",
      boxShadow: "0 0 2px rgba(0, 0, 0, 0.1)",
    }}
    className="relative   items-center justify-center bg-gradient-to-b from-transparent opacity-90"
  >
    <FlexCol
      style={{ width: `${calculatedWidth}px`, height: `${fixedHeight}px` }}
      className="h-full w-full border-black transition-all duration-1000 ease-in-out"
    >
      {/* Horizontal Line for Width */}
      <Absolute className="left-0 top-0 h-[1px] w-full antialiased  ">
        <Relative className="flex w-full justify-center">
          <FlexRow className="-mt-4  h-10 w-fit gap-x-1 bg-lunnheim-pale-yellow px-3 py-2 text-xs">
            <div>{width}</div>
            <div> cm</div>
          </FlexRow>
        </Relative>
      </Absolute>

      <Absolute className="right-0 top-0 ml-auto h-full w-[1px]  antialiased">
        <Relative className="flex h-full flex-col justify-center">
          <FlexRow className="-ml-8 h-fit w-10 gap-x-1 bg-lunnheim-pale-yellow px-6 py-2 text-xs">
            <div>{height}</div>
            <div> cm</div>
          </FlexRow>
        </Relative>
      </Absolute>

      <div className="-1 my-auto flex w-fit place-self-center self-center  font-serif  text-2xl text-black"></div>
    </FlexCol>
  </FlexCol>
  )
}

export default ImageFrameCalculator
