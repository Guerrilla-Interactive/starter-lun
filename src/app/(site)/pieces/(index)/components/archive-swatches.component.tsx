import React, { useRef, useState } from "react"
import { useDraggable } from "react-use-draggable-scroll"
import {
  PieceVariantQuery,
  PieceVariantsQuery,
} from "../../pieces-shared-utils/pieces-queries/pieces.shared-queries"

interface ArchiveSwatchesProps extends PieceVariantsQuery {
  onVariantSelect: (variant: PieceVariantQuery, index: number) => void
  variants: any
  pieceId: string
}

export const ArchiveSwatches: React.FC<ArchiveSwatchesProps> = ({
  variants,
  onVariantSelect,
  pieceId,
}) => {
  const [selectedVariant, setSelectedVariant] =
    useState<PieceVariantQuery | null>(null)

  const handleVariantClick = (variant: PieceVariantQuery, index: number) => {
    setSelectedVariant(variant)
    onVariantSelect(variant, index)
  }

  const ref = useRef<HTMLDivElement>(null)
  const { events } = useDraggable(
    ref as React.MutableRefObject<HTMLElement>,
    {}
  )

  const validVariants = variants || []
  const displayLimit = 4
  const hiddenCount =
    validVariants.length > displayLimit
      ? validVariants.length - displayLimit
      : 0

  return (
    <div
      className="!active:cursor-grabbing flex max-w-xl !cursor-grab space-x-2 overflow-x-scroll scrollbar-hide"
      {...events}
      ref={ref}
    >
      {validVariants.slice(0, displayLimit).map((variant: any, index: any) => (
        <div
          key={`${pieceId}-${variant._key}`}
          className={`border-1 mb-2 cursor-pointer rounded-md border-[2px] border-lunnheim-ivory-yellow p-[3px] shadow-sm 
                    ${selectedVariant?._key === variant._key
              ? "border-lunnheim-olive"
              : " "
            }`}
          style={{ backgroundColor: variant.variantColor?.hex || "" }}
          onClick={(e) => {
            // Stop propogation so that the Link in the parent doesn't trigger
            // Just having stopPropogation doesn't seem to work
            e.preventDefault()
            e.stopPropagation()
            handleVariantClick(variant, index)
          }}
        >
          <div
            className={`h-3 w-3 flex-none rounded-md p-1   
                        ${selectedVariant?._key === variant._key ? "" : ""}`}
            style={{ backgroundColor: `${variant.variantColor?.hex}` }}
          ></div>
        </div>
      ))
      }
      {
        hiddenCount > 0 && (
          <div className="ml-2 text-sm text-gray-500">+{hiddenCount}</div>
        )
      }
    </div >
  )
}

ArchiveSwatches.defaultProps = {
  variants: [],
}
