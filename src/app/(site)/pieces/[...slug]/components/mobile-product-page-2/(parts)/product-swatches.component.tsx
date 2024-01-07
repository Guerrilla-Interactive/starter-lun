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
      className="!active:cursor-grabbing mx-auto flex w-fit max-w-xl   !cursor-grab space-x-3   overflow-x-scroll scrollbar-hide md:ml-0 md:px-6"
      {...events}
      ref={ref}
    >
      {filteredVariants?.map((variant) => (
        <div
          key={variant._key}
          onClick={() => props.onVariantSelect(variant)}
          style={{}}
          className={`  border-1  pb--1    mb-2 cursor-pointer   rounded-lg border-[2px] border-lunnheim-ivory-yellow  p-[3px]
                ${
                  props.activeVariant?._key === variant._key
                    ? "  border-lunnheim-olive    "
                    : " "
                }`}
        >
          <div
            className={`h-3 w-3 flex-none rounded-md p-2   
                    ${props.activeVariant?._key === variant._key ? "" : ""}`}
            style={{ backgroundColor: `${variant.variantColor?.hex}` }}
          ></div>
        </div>
      ))}
    </div>
  )
}
