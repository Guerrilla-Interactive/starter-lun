"use client"

import React, { useEffect, useRef, useState } from "react"

const VideoScroll = () => {
  const FRAMES = 90
  const FPS = 30

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const [time, setTime] = useState(0)

  const handleScroll = () => {
    const sectionTop = sectionRef.current?.offsetTop || 0

    if (window.scrollY >= sectionTop) {
      const newTime = (((window.scrollY - sectionTop) / 1000) * FRAMES) / FPS
      console.log("Scroll event:", newTime) // Debugging line
      setTime(newTime)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      console.log("Time update:", time) // Debugging line
      videoRef.current.currentTime = time
    }
  }, [time])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[250vh] bg-[#111f3a]"
      style={{
        display: "flex",
        position: "relative",
        justifyContent: "top",
        alignItems: "start",
      }}
    >
      <video
        ref={videoRef}
        className="sticky top-0 h-full w-full"
        width="998"
        height="560"
        playsInline
        poster="https://lqez.github.io/js/airpodsvf/video.jpg"
      >
        <source src="video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>
  )
}

export default VideoScroll
