"use client"
import Image from "next/image"
import React, { useEffect, useRef, useState } from "react"

interface BackgroundLayerProps {
  overlayColor: string
  imageUrl: string

  minHeight: { amount: number; unit: string }
  maxHeight: { amount: number; unit: string }
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({
  minHeight,
  maxHeight,
  overlayColor,
  imageUrl,
}) => {
  const computedHeight = `min(${minHeight.amount}${minHeight.unit}, ${maxHeight.amount}${maxHeight.unit})`
  return (
    <div
      className="sticky left-0 top-0 z-[-20]"
      style={{ height: computedHeight }}
    >
      <BackgroundOverlay
        minHeight={minHeight}
        maxHeight={maxHeight}
        overlayColor={overlayColor}
      />
      <BackgroundImage
        minHeight={minHeight}
        maxHeight={maxHeight}
        imageUrl={imageUrl}
      />
    </div>
  )
}

export const BackgroundOverlay: React.FC<
  Omit<BackgroundLayerProps, "imageUrl">
> = ({ overlayColor, minHeight, maxHeight }) => {
  const computedHeight = `min(${minHeight.amount}${minHeight.unit}, ${maxHeight.amount}${maxHeight.unit})`
  return (
    <div
      style={{ height: computedHeight, backgroundColor: overlayColor }}
      className="absolute z-10 w-full"
    ></div>
  )
}

export const BackgroundImage: React.FC<
  Omit<BackgroundLayerProps, "overlayColor">
> = ({ imageUrl, minHeight, maxHeight }) => {
  const parallaxImage = useRef<HTMLImageElement>(null)
  const [displayedImageUrl, setDisplayedImageUrl] = useState(imageUrl)
  const [opacity, setOpacity] = useState<number>(1)
  const transitionDuration = 0 // 0.3s transition time for fading

  const computedHeight = `min(${minHeight.amount}${minHeight.unit}, ${maxHeight.amount}${maxHeight.unit})`

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxImage.current) {
        const offsetTop = parallaxImage.current.getBoundingClientRect().top
        const speed = 0.1
        parallaxImage.current.style.transform = `translateY(${
          -offsetTop * speed
        }px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Fade out current image
    setOpacity(0)

    // Change the image URL after the fade-out transition is completed
    const timeoutId = setTimeout(() => {
      setDisplayedImageUrl(imageUrl)
      // Fade in new image
      setOpacity(1)
    }, transitionDuration)

    return () => clearTimeout(timeoutId)
  }, [imageUrl])

  return (
    <>
      <Image
        ref={parallaxImage}
        src={displayedImageUrl}
        alt="Background"
        width={2000}
        priority
        unoptimized
        height={2000}
        className="h-full w-full object-cover"
        style={{
          opacity: opacity,
          transition: `opacity ${transitionDuration}ms`,
        }}
      />
      <div className="fader absolute left-0 top-0 -z-10 h-full w-full bg-[#333]"></div>
    </>
  )
}
