"use client"

import React, { useState } from "react"
import { cn } from "@/src/utils/cn.util"

interface TogglePanelProps {
  title?: string
  children?: React.ReactNode
}

const TogglePanel: React.FC<TogglePanelProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <div className="w-full">
        {isOpen && (
          <div className="panel">
            <div>{children}</div>
          </div>
        )}
      </div>
      <button
        className={cn(
          "fixed bottom-6 right-6 mr-auto h-14 w-14 rounded-full  border-2 border-white border-opacity-70 bg-slate-100 bg-opacity-30 text-xs backdrop-blur-md  transition-all duration-100 hover:scale-105 hover:border-opacity-100 hover:bg-opacity-60 active:scale-95 active:bg-opacity-80",
          isOpen && "scale-105  bg-opacity-80"
        )}
        onClick={handleToggle}
      >
        {isOpen ? "Close" : "States"}
      </button>
    </>
  )
}

export default TogglePanel
