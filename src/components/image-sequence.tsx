"use client"

import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import React, { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

interface ImageSequenceProps {
  frameCount: number
  imgFolder: string
}

const ImageSequence: React.FC<ImageSequenceProps> = ({
  frameCount,
  imgFolder,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const imageAspectRatio = 1.499 // replace this with the aspect ratio of your images
  const updateCanvasSize = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      canvas.width = canvas.offsetWidth

      canvas.height = canvas.width / imageAspectRatio
      const context = canvas.getContext("2d")
      if (context) {
        context.imageSmoothingEnabled = true // smoothing
        context.imageSmoothingQuality = "high" // high quality
      }
    }
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext("2d")

    if (!context) return

    updateCanvasSize()

    window.addEventListener("resize", updateCanvasSize)

    const currentFrame = (index: number) =>
      `${imgFolder}snurrebord-${index.toString().padStart(2, "0")}.png`

    const images: HTMLImageElement[] = []
    const snurrebord = { frame: 0 }

    const loadImages = async () => {
      const loadPromises = Array.from({ length: frameCount }, (_, i) => {
        const img = new Image()
        img.src = currentFrame(i)
        console.log(`Loading image: ${img.src}`) // Debugging log
        return new Promise<HTMLImageElement>((resolve, reject) => {
          img.onload = () => {
            console.log(`Image loaded: ${img.src}`) // Debugging log
            // If this is the first image, draw it onto the canvas immediately
            if (i === 0 && context) {
              context.clearRect(0, 0, canvas.width, canvas.height)
              context.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
            resolve(img)
          }
          img.onerror = reject
        })
      })

      images.push(...(await Promise.all(loadPromises)))

      // All images loaded
      gsap.to(snurrebord, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: ".canvas-container",
          start: "top top",
          pinType: "fixed",
          end: "+=2000",

          pin: true,
          scrub: 0.5,
        },
        onUpdate: render,
      })
    }

    loadImages()

    function render() {
      if (!context) return
      // If the current frame is 0 and the first image has loaded, draw the first image
      const currentImage = images[snurrebord.frame] || images[0]
      if (currentImage) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        context.drawImage(currentImage, 0, 0, canvas.width, canvas.height)
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
      window.removeEventListener("resize", updateCanvasSize)
    }
  }, [frameCount, imgFolder])

  return (
    <div className="spacer">
      <div
        className="canvas-container"
        style={{ position: "relative", width: "100%", height: "100vh" }}
      >
        <canvas
          ref={canvasRef}
          id="hero-lightpass"
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className="spacer"></div>
    </div>
  )
}

export default ImageSequence
