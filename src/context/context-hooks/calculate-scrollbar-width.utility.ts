// useScrollbarWidth.ts
import { useState, useEffect } from "react"

const useScrollbarWidth = () => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0)

  useEffect(() => {
    const calculateScrollbarWidth = () =>
      window.innerWidth - document.documentElement.clientWidth
    setScrollbarWidth(calculateScrollbarWidth())

    window.addEventListener("resize", () =>
      setScrollbarWidth(calculateScrollbarWidth())
    )

    return () =>
      window.removeEventListener("resize", () =>
        setScrollbarWidth(calculateScrollbarWidth())
      )
  }, [])

  return scrollbarWidth
}

export default useScrollbarWidth
