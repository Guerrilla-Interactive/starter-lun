import type { BlazeConfig } from "blaze-slider";
import BlazeSlider from "blaze-slider"
import React from "react"

export function useBlazeSlider(config: BlazeConfig) {
  const sliderRef = React.useRef<BlazeSlider | null>(null)
  const elRef = React.useRef<HTMLElement | null>(null)

  React.useEffect(() => {
    // if not already initialized
    if (!sliderRef.current && elRef.current !== null) {
      sliderRef.current = new BlazeSlider(elRef.current, config)
    }
  }, [config])

  return elRef
}
