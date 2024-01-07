"use client"

import "keen-slider/keen-slider.min.css"

import { useKeenSlider } from "keen-slider/react"
import { useRouter } from 'next/navigation'
import React, { useState } from "react"

import { AllCategoryPieceType, CategoryFilterSlider, } from "@/src/components/category-filter-slider/category-filter-slider.component"
import { H1 } from "@/src/components/layout/heading.component"
import {
  Container,
  FlexCol,
  GapY,
  Grid,
  Relative,
  Section,
} from "@/src/components/nextgen-core-ui"
import { Img } from "@/src/components/utils/img.component"
import { LinkResolver } from "@/src/components/utils/link-resolver.component"
import { useGlobalContext } from "@/src/context/global-context"

import type { CategoryQueryType } from "../../../categories/categories-shared-utils/categories-queries/categories.shared-queries"
import type { PieceQuery } from "../../pieces-shared-utils/pieces-queries/pieces.shared-queries"
import type { PiecesIndexQuery, PiecesQuery } from "../(pieces-index-core)/(pieces-index-server)/pieces.index-query"
import { ArchiveSwatches } from "./archive-swatches.component"

export const PieceItem: React.FC<{ piece: PieceQuery }> = ({ piece }) => {
  const images =
    piece.variants?.map((variant) => variant.variantMainImage) || []
  const [variantId, setVariantId] = useState(piece.variants && piece.variants.length > 0 ? piece.variants[0]?.slug : "")
  const [keenRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    created: () => {
      // Do nothing
    },
    slideChanged(slider) {
      const variantIndex = slider.track.details.rel
      setVariantId(piece.variants ? piece.variants[variantIndex]?.slug : "")
    },
  })

  return (
    <FlexCol className="w-full max-w-[250px]">
      <div
        className="group !z-50 transition-all duration-100 lg:even:mt-28"
      >
        <GapY gap-y-3>
          <LinkResolver
            className=""
            linkType="internal"
            link={{
              _type: piece._type,
              slug: `${piece.slug}/${variantId}`, // piece-cateogry/piece-slug/piece-variant
              title: piece.title,
            }}
          >
            {images.length > 0 && (
              <div
                ref={keenRef}
                className="keen-slider relative aspect-[3/4] h-full max-w-[100%] rounded-3xl"
              >
                {images.map((image, slideIdx) => (
                  <Relative key={slideIdx} className="keen-slider__slide">
                    <Img
                      sizes="(max-width: 850px) 100vw, 850px"
                      image={image}
                      eager
                      className="absolute left-0 top-0 h-full w-full object-cover"
                    />
                  </Relative>
                ))}
              </div>
            )}
          </LinkResolver>

          <Container className="px-2">
            <GapY gap-y-2>
              <h4 className="font-serif">{piece?.title}</h4>
              {piece._id && (
                <ArchiveSwatches
                  variants={piece.variants}
                  pieceId={piece._id}
                  onVariantSelect={(_variant, index) => {
                    instanceRef.current?.moveToIdx(index)
                  }}
                />
              )}
            </GapY>
          </Container>
        </GapY>
      </div>
    </FlexCol>
  )
}

export const MobilePieceArchivePage: React.FC<PiecesIndexQuery> = (props) => {
  return (
    <MobilePieceArchivePageWrapper {...props}>
      <H1 className="font-serif !text-3xl  font-light ">Pieces</H1>
    </MobilePieceArchivePageWrapper>
  )
}

interface CategoryProps extends PiecesQuery {
  category: CategoryQueryType,
  categories: CategoryQueryType[]
}

export const CategoriesArchive: React.FC<CategoryProps> = (props) => {
  const categoryTitle = props.category.title
  let filteredPieces = props.pieces || []
  if (categoryTitle !== AllCategoryPieceType.title) {
    filteredPieces = filteredPieces.filter(x => x.pieceType?.slug === props.category.slug)
  }
  const { globalData, } = useGlobalContext()
  const router = useRouter()
  return (
    <MobilePieceArchivePageWrapper pieces={filteredPieces}>
      { /* TODO Slider */}
      <Section className="flex flex-col  bg-lunnheim-ivory-yellow py-24  pt-12 ">
        <CategoryFilterSlider
          style={{
            paddingLeft: globalData.screenData.defaultContainerMarginX,
          }}
          pieces={props?.pieces as any}
          activeCategory={props.category ?? null}
          setActiveCategory={(newCategory) => {
            if (newCategory && newCategory.slug !== AllCategoryPieceType.slug) {
              router.push(`/categories/${newCategory.slug}`)
            } else {
              router.push(`/categories/`)
            }
          }}
          categories={props.categories}
        />
      </Section>
    </MobilePieceArchivePageWrapper>
  )
}

export const MobilePieceArchivePageWrapper: React.FC<React.PropsWithChildren<PiecesQuery>> = (props) => {
  return (
    <Section className="mb-24">
      <GapY gap-y-12>
        <Container className="mt-40   md:mt-24 md:px-6">
          {/* Title Component As Children */}
          {props.children}
        </Container>
        <Container className="!max-w-[95vw]">
          <Grid className="grid-cols-2 gap-[10px] gap-y-10">
            {props.pieces?.map((piece, idx) => (
              <PieceItem key={idx} piece={piece} />
            ))}
          </Grid>
        </Container>
      </GapY>
    </Section>
  )
}
