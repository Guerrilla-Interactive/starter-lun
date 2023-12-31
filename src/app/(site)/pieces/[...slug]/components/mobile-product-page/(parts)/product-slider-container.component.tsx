import { FlexCol } from "@/src/components/nextgen-core-ui"
import React from "react"

interface ProductSliderContainerProps {
  children: React.ReactNode
  className?: string
}

export const ProductSliderContainer: React.ForwardRefRenderFunction<
  HTMLDivElement,
  ProductSliderContainerProps
> = ({ children, className }, ref) => {
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

export default React.forwardRef(ProductSliderContainer)
