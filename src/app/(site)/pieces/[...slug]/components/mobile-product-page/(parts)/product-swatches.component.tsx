import React, { useRef } from "react"
import { useDraggable } from "react-use-draggable-scroll"

import type {
  PieceVariantQuery,
  PieceVariantsQuery,
} from "../../../../pieces-shared-utils/pieces-queries/pieces.shared-queries"

// Types for productVariant (modify as needed)

export const ProductSwatches: React.FC<
  PieceVariantsQuery & {
    onVariantSelect: (variant: PieceVariantQuery) => void
    selectedMaterial: string
    activeVariant?: PieceVariantQuery
  }
> = (props) => {
  const filteredVariants = props.variants?.filter(
    (variant) =>
      variant.materialType === props.selectedMaterial ||
      props.selectedMaterial === "All"
  )

  const ref =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>
  const { events } = useDraggable(ref, {})

  return (
    <div
      className="!active:cursor-grabbing flex max-w-xl !cursor-grab   space-x-3 overflow-x-scroll px-[5vw] scrollbar-hide md:px-6"
      {...events}
      ref={ref}
    >
      {filteredVariants?.map((variant) => (
        <div
          key={variant._key}
          onClick={() => props.onVariantSelect(variant)}
          style={{}}
          className={`  mb-2  rounded-lg  
                ${
                  props.activeVariant?._key === variant._key
                    ? "rounded-full border-[1px] !border-lunnheim-pale-yellow bg-lunnheim-olive pb-[1px]  opacity-40  shadow-lg   "
                    : "  border-1 cursor-pointer border-[1px] border-lunnheim-ivory-yellow  pb-[1px]"
                }`}
        >
          <div
            className={`h-12 w-12 flex-none rounded-md p-4   
                    ${
                      props.activeVariant?._key === variant._key
                        ? "my-auto transition-all duration-100  "
                        : ""
                    }`}
            style={{ backgroundColor: `${variant.variantColor?.hex}` }}
          ></div>
        </div>
      ))}
    </div>
  )
}
