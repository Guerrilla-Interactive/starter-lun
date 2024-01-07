import React, { useState } from "react"

import type { PieceQuery } from "@/src/app/(site)/pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries"

import { H5 } from "../layout/heading.component"
import { Container, FlexCol, GapY } from "../nextgen-core-ui"
import { Img } from "../utils/img.component"
import { LinkResolver } from "../utils/link-resolver.component"

interface PieceItemProps {
  piece: PieceQuery;
  isCentered?: boolean; // New prop for determining centered state
}


export const PieceItem: React.FC<PieceItemProps> = ({ piece, isCentered = false }) => {
  const [isHovered, setIsHovered] = useState(false)
  const mainImage = piece.mainImage
  const secondaryImage = piece.secondaryImage
    ?? piece.generalImageGallery?.[1]
    ?? piece.generalImageGallery?.[0]
    ?? piece.variants?.[0]?.variantImageGallery?.[0]
    ?? null;

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }


  const showSecondaryImage = isCentered || (isHovered && secondaryImage);
  return (
    <div className="group" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <FlexCol className="w-[265px] max-w-[265px] transition-all duration-500 group-active:opacity-80 md:group-hover:-mt-1 md:group-hover:mb-1 md:group-active:scale-95">
        <LinkResolver
          className="group !z-50 transition-all duration-100 lg:even:mt-28"
          linkType="internal"
          link={{
            _type: piece._type,
            slug: `${piece.slug}`,
            title: piece.title,
          }}
        >
          <GapY gap-y-3>
            <div className="relative aspect-[3/4] h-full max-w-[100%] overflow-hidden rounded-3xl">
              {mainImage && (
                <Img
                  sizes="(max-width: 850px) 100vw, 850px"
                  image={mainImage}
                  eager
                  className={`absolute left-0 top-0 h-full w-full object-cover transition-opacity duration-500 ${showSecondaryImage ? 'opacity-0' : 'opacity-100'}`}
                />
              )}
              {secondaryImage && (
                <Img
                  sizes="(max-width: 850px) 100vw, 850px"
                  image={secondaryImage}
                  eager
                  className={`absolute left-0 top-0 h-full w-full object-cover transition-opacity duration-500 ${showSecondaryImage ? 'opacity-100' : 'opacity-0'}`}
                />
              )}
            </div>

            <Container className="px-2">
              <GapY gap-y-2>
                <H5 className=" !text-center font-serif">
                  {piece?.title}
                </H5>
              </GapY>
            </Container>
          </GapY>
        </LinkResolver>
      </FlexCol>
    </div>
  )
}
