import { FlexCol } from "@/src/components/nextgen-core-ui"
import { cn } from "@/src/utils/cn.util"
import React from "react"

interface ProductSliderContainerProps {
  children: React.ReactNode
  className?: string
}

const ProductSliderContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ProductSliderContainerProps
> = ({ children, className }, ref) => {
  return (
    <div ref={ref} className={cn(className, "")}>
      {children}
    </div>
  )
}

export default React.forwardRef(ProductSliderContainer)
