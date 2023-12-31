// Import necessary dependencies
import React, { Dispatch, SetStateAction } from "react"
import { cn } from "@/utils/cn.util"

// Define the props type
interface OpenCartMenuProps {
  isCartOpen: boolean
  setIsCartOpen: Dispatch<SetStateAction<boolean>>
  className?: string
}

// Define the component
export const OpenCartMenu = ({
  isCartOpen,
  setIsCartOpen,
  className,
}: OpenCartMenuProps) => (
  <button
    className={cn(className, "menu:hidden group flex text-xs sm:text-base")}
    onClick={(e) => {
      e.stopPropagation()
      setIsCartOpen(!isCartOpen)
    }}
  >
    <span
      className={cn(
        "flex cursor-pointer rounded-xl bg-lunnheim-dark-olive bg-opacity-0 px-6 py-1 text-lunnheim-dark-olive transition-all duration-200 hover:bg-opacity-10 active:bg-opacity-20"
      )}
    >
      {isCartOpen ? <div> Close Cart</div> : <div>Open Cart</div>}
    </span>
  </button>
)
