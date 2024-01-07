"use client"

import "keen-slider/keen-slider.min.css"

import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react"
import React, { useEffect, useRef, useState } from "react"

import {
  Absolute,
  Container,
  Flex,
  GapY,
  Relative,
  Section,
} from "@/src/components/nextgen-core-ui"
import Sticky from "@/src/components/nextgen-core-ui/sticky.component/sticky.component"
import VerticalSpace from "@/src/components/nextgen-core-ui/vertical-space.component"

import { Img } from "@/src/components/utils/img.component"

import type {
  PieceQuery,
  PieceVariantQuery,
} from "../../../pieces-shared-utils/pieces-queries/pieces.shared-queries"
import MaterialFilterTabs from "./(parts)/material-filter-tabs.component"
import { ProductSelected } from "./(parts)/product-selected.component"
import ProductSliderContainer from "./(parts)/product-slider-container.component"
import { ProductSwatches } from "./(parts)/product-swatches.component"

import { ProductAccordions } from "./(parts)/product-accordion"
import { ShippingSection } from "./(parts)/shipping-section.component"
import { ProductCtaButtons } from "./(parts)/product-cta-buttons.component"
import { ProductDescription } from "./(parts)/product-description"
import { SpecialistSection } from "./(parts)/specialist-section.component"

export const MobileProductPage: React.FC<PieceQuery> = (props) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [sliderHeight, setSliderHeight] = useState(0)
  const [, setSliderWidth] = useState(0)
  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)

  const [selectedMaterial, setSelectedMaterial] = useState("All")
  const [selectedVariant, setSelectedVariant] = useState(
    props.variants && props.variants.length > 0 ? props.variants[0] : undefined
  )

  const MutationPlugin: KeenSliderPlugin = (slider) => {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function() {
        slider.moveToIdx(0)

        slider.update()
        slider.moveToIdx(0)
      })
    })
    const config = { childList: true }

    slider.on("created", () => {
      observer.observe(slider.container, config)
      slider.update()
    })

    slider.on("destroyed", () => {
      observer.disconnect()
    })
  }

  const handleMaterialChange = (label: string) => {
    setSelectedMaterial(label)
  }

  const [keenRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      created: () => {
        setLoaded(true)
        console.log("created")
      },

      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      slides: {
        perView: 1,
      },
    },
    [MutationPlugin]
  )

  const handleVariantSelect = (variant: PieceVariantQuery) => {
    setSelectedVariant(variant)
    instanceRef.current?.moveToIdx(0)
  }

  useEffect(() => {
    if (sliderRef.current) {
      setSliderHeight(sliderRef.current.offsetHeight)
      setSliderWidth(sliderRef.current.offsetWidth)
    }
  }, [])

  const displayTitle = props.title
  const numberOfVariantImages =
    selectedVariant?.variantImageGallery?.length || 0
  const numberOfGeneralImages = props.generalImageGallery?.length || 0
  const numberOfImages =
    numberOfVariantImages +
    numberOfGeneralImages +
    (selectedVariant?.variantMainImage ? 1 : 0)

  return (
    <Section className="relative bg-lunnheim-ivory-yellow">
      <Absolute className="pointer-events-auto z-[-20] w-full" top>
        <Relative className="min-h-[1600px]">
          <Sticky className="" top={0}>
            <ProductSliderContainer ref={sliderRef}>
              <div
                ref={keenRef}
                className="keen-slider relative  h-[33rem] max-w-[100%]"
              >
                {selectedVariant && (
                  <>
                    <div className="keen-slider__slide">
                      <Img
                        sizes="(max-width: 800px) 100%, 800px"
                        image={selectedVariant.variantMainImage}
                        absoluteHotspot
                        eager
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {[
                      ...(selectedVariant.variantImageGallery || []),
                      ...(props.generalImageGallery || []),
                    ].map((image, index) => (
                      <div key={index} className="keen-slider__slide">
                        <Img
                          sizes="(max-width: 1700px) 100vw, 1700px"
                          image={image}
                          eager
                          absoluteHotspot
                          className="absolute h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </ProductSliderContainer>
          </Sticky>
        </Relative>
      </Absolute>
      <VerticalSpace
        className="pointer-events-none -z-30"
        animated
        height={sliderHeight}
      />
      <GapY gap-y-6 className="bg-lunnheim-ivory-yellow  ">
        <Section className="">
          <Container className="md:px-6 ">
            <GapY gap-y-6>
              <Flex className="h-8 items-center justify-between gap-x-4  transition-all duration-700 last:hidden">
                {loaded && instanceRef.current && (
                  <>
                    {[...Array(numberOfImages).keys()].map((idx) => {
                      return (
                        <div
                          className="h-8 w-full "
                          key={idx}
                          onClick={() => {
                            instanceRef.current?.moveToIdx(idx)
                          }}
                        >
                          <button
                            className={
                              "max-w-8 h-[1px]  w-full transition-all duration-700  " +
                              (currentSlide === idx
                                ? " bg-lunnheim-pale-yellow"
                                : " bg-slate-300")
                            }
                          ></button>
                        </div>
                      )
                    })}
                  </>
                )}
              </Flex>
              <GapY gap-y-8>
                <GapY
                  gap-y-7
                  className="rounded-2xl  bg-opacity-20 text-left text-white"
                >
                  <GapY gap-y-0-5>
                    <h2
                      data-dx="product-name"
                      className="font-serif text-2xl  text-lunnheim-dark-olive"
                    >
                      {displayTitle}
                    </h2>
                    <p data-dx="product-price" className="text-lunnheim-olive">
                      NOK 27 500
                    </p>
                  </GapY>
                  <Flex className="justify-between">
                    <MaterialFilterTabs
                      materials={props.materialTypes || []}
                      onTabChange={handleMaterialChange}
                    />
                    <ProductSelected
                      variantColor={selectedVariant?.variantColor}
                      variant={selectedVariant?.name}
                    />
                  </Flex>
                </GapY>
              </GapY>
            </GapY>
          </Container>
        </Section>
        <Section className="">
          <ProductSwatches
            variants={props.variants}
            onVariantSelect={handleVariantSelect}
            selectedMaterial={selectedMaterial}
            activeVariant={selectedVariant}
          />
        </Section>

        <Section className="">
          <Container className="pb md:px-6">
            <GapY gap-y-6>
              <GapY gap-y-3>
                {/* <FlexCol className="h-full w-full gap-y-[2.5px] bg-lunnheim-pale-yellow bg-opacity-30 px-4  py-3 text-xxs">
                                    <FlexRow className="text-[9px] font-thin text-lunnheim-dark-olive opacity-75 ">Finish</FlexRow>
                                    <FlexRow className="font-semibold text-lunnheim-dark-olive">Medium Mahagony</FlexRow>
                                </FlexCol>
                                <FlexCol className="h-full w-full gap-y-[2.5px] bg-lunnheim-pale-yellow bg-opacity-30 px-4 py-3 text-xxs">
                                    <FlexRow className="text-[9px] font-thin text-lunnheim-dark-olive opacity-75 ">Size</FlexRow>
                                    <FlexRow className="font-semibold text-lunnheim-dark-olive">One size</FlexRow>
                                </FlexCol> */}
                <ProductCtaButtons />
              </GapY>
              <ShippingSection />
            </GapY>
          </Container>
        </Section>

        {props.dimensions && (
          <ProductAccordions dimensions={props.dimensions} />
        )}
        {props.description && (
          <ProductDescription
            generalImageGallery={props.generalImageGallery}
            description={props.description}
          />
        )}
        <Container className="pb-12 md:px-6">
          <SpecialistSection />
        </Container>
      </GapY>
    </Section>
  )
}
