import React from "react"

import { FlexCol, FlexRow, GapX } from "@/src/components/nextgen-core-ui"

type ProductSelectedProps = {
  variant: string | undefined
  variantColor:
    | {
        hex: string
      }
    | undefined
}

export const ProductSelected: React.FC<ProductSelectedProps> = ({
  variant,
  variantColor,
}) => {
  return (
    <FlexRow className="text-xxs text-lunnheim-dark-olive">
      <GapX gap-x-2>
        <FlexCol>
          <FlexRow className="my-auto">
            <GapX gap-x-1>
              <FlexCol>{variant}</FlexCol>
            </GapX>
          </FlexRow>
        </FlexCol>
        <FlexCol
          className="h-5 w-5 rounded-full border border-gray-200"
          style={{ backgroundColor: variantColor?.hex }}
        ></FlexCol>
      </GapX>
    </FlexRow>
  )
}
