"use client"
import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { LunnheimLogo } from "@/sanity/desk/theme/lunnheim-logo.component"

export const AnimatedIntro: React.FC = () => {
  const { scrollY } = useScroll()

  const opacity = useTransform(scrollY, [0, 355], [1, 0])
  const scale = useTransform(scrollY, [0, 355], [1, 0.8])

  const [zoomLevel, setZoomLevel] = useState<number>(100) // Default zoom level 100%

  useEffect(() => {
    const initialScale = window.devicePixelRatio
    const handleResize = () => {
      const currentScale = window.devicePixelRatio
      const zoomLevel = (currentScale / initialScale) * 45
      setZoomLevel(zoomLevel)
    }

    // Set initial zoom level
    handleResize()

    // Listen for window resize events
    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const marginTop = useTransform(
    scrollY,
    [0, 355],
    [27.5 + "vh", zoomLevel + "vh"]
  )

  return (
    <motion.div
      style={{ opacity, scale, marginTop }}
      className="z-10  mx-auto mt-auto max-w-md   "
    >
      <LunnheimLogo className="mx-auto" style={{ width: "17.5rem" }} animated />
      <div className="mx-auto  mt-[-5rem] w-[100%] animate-slowIntro">
        <p className="text-center font-serif text-xl font-extralight text-lunnheim-ivory-yellow">
          Anticipate an audacious, playful space, teeming with our bold tales
          and designs. Await the reveal.
        </p>
      </div>
    </motion.div>
  )
}
