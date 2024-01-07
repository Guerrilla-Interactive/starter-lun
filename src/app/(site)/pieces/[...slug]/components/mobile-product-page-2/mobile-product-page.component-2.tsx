"use client"

import "keen-slider/keen-slider.min.css"

import type { KeenSliderPlugin} from "keen-slider/react";
import { useKeenSlider } from "keen-slider/react"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from "react"

import { debounce,DimensionsBox } from "@/src/components/image-frame-calculator/image-frame-calculator.component"
import {
  Container,
  Flex,
  FlexCol,
  GapY,
  Section,
} from "@/src/components/nextgen-core-ui"
import { Img } from "@/src/components/utils/img.component"
import type { ShoppingCartItem} from "@/src/context/global-context";
import { useGlobalContext } from "@/src/context/global-context"

import type {
  PieceQuery,
  PieceVariantQuery,
} from "../../../pieces-shared-utils/pieces-queries/pieces.shared-queries"
import type { VariantIdType } from "../../(pieces-slug-core)/(pieces-slug-destination)/page"
import { ProductAccordions } from "./(parts)/product-accordion"
import { ProductDescription } from "./(parts)/product-description"
import { ProductSelected } from "./(parts)/product-selected.component"
import ProductSliderContainer from "./(parts)/product-slider-container.component"
import { ProductSwatches } from "./(parts)/product-swatches.component"
import { ShippingSection } from "./(parts)/shipping-section.component"
import { SpecialistSection } from "./(parts)/specialist-section.component"

export const MobileProductPage2: React.FC<PieceQuery & { variant: VariantIdType, pieceSlug: string }> = (props) => {
  const router = useRouter()
  const { addToCart } = useGlobalContext();

  const sliderRef = useRef<HTMLDivElement>(null)
  const [, setSliderHeight] = useState(0)

  // TODO Update
  const initialWidth = 70
  const initialHeight = 40

  const [defaultSize, setDefaultSize] = useState(false)
  const [sizeSliderActive, setSizeSliderActive] = useState(false)
  const [width, setWidth] = useState(initialWidth)
  const [height, setHeight] = useState(initialHeight)


  const handleAddToCart = () => {
    const dummyItem: ShoppingCartItem = {
      id: `${props._id}---${Math.random() * Math.random()}`,
      name: props.title, // Name of the product
      price: selectedVariant?.variantPrice ?? props.standardPrice,
      variant: selectedVariant?.name ?? '',
      quantity: 1, // Quantity of the item being added
      imageUrl: selectedVariant?.variantMainImage?.asset?.url ?? "",
      sizeNote: defaultSize ? "Default" : `Width: ${width}. Height: ${height}`
    };
    addToCart(dummyItem as any);
  };

  const { setGlobalData } = useGlobalContext()

  const [currentSlide, setCurrentSlide] = React.useState(0)
  const [loaded, setLoaded] = useState(false)

  const [selectedMaterial] = useState("All")

  // Select appropriate initial variant!
  // If it is a variant page, display the variant
  let initialVariant
  if (props.variant) {
    initialVariant = props.variants?.find(x => x.slug === props.variant)
  } else if (props.variants && props.variants.length > 0) {
    // If it is a mainpage, display the page.
    initialVariant = props.variants[0]
  }

  const [selectedVariant, setSelectedVariant] = useState(
    initialVariant
    // props.variants && props.variants.length > 0 ? props.variants[0] : undefined
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

      breakpoints: {
        "(max-width: 768px)": {
          loop: false,
          slides: {
            perView: 1,
          },
        },
        "(min-width: 768px)": {
          slides: {
            perView: 5,
          },
        },
      },
    },
    [MutationPlugin]
  )

  const handleVariantSelect = (variant: PieceVariantQuery) => {
    setSizeSliderActive(false)
    setSelectedVariant(variant)
    instanceRef.current?.moveToIdx(0)
    // TODO, 
    // Change the url without reloading the page
    // https://medium.com/@moh.mir36/shallow-routing-with-next-js-v13-app-directory-2d765928c340
    // Update the URL appropriately
    // https://github.com/vercel/next.js/discussions/48110
    router.push(`/pieces/${props.pieceSlug}/${variant.slug}`)
  }

  useEffect(() => {
    const updateSliderHeight = () => {
      if (sliderRef.current) {
        const newHeight = sliderRef.current.offsetHeight
        setSliderHeight(newHeight)

        // Update the global context with the new height
        setGlobalData((prevData) => ({
          ...prevData, // keep the other data properties unchanged
          height: newHeight, // update the height
        }))
      }
    }

    updateSliderHeight()
    window.addEventListener("resize", updateSliderHeight)

    return () => {
      window.removeEventListener("resize", updateSliderHeight)
    }
  }, [setGlobalData]) // add setGlobalData as a dependency so the effect knows to re-run if it changes

  const displayTitle = props.title
  const numberOfVariantImages =
    selectedVariant?.variantImageGallery?.length || 0
  const numberOfGeneralImages = props.generalImageGallery?.length || 0
  const numberOfImages =
    numberOfVariantImages +
    numberOfGeneralImages +
    (selectedVariant?.variantMainImage ? 1 : 0)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetWidth = useCallback(debounce(setWidth, 0.1), [])
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetHeight = useCallback(debounce(setHeight, 0.1), [])

  const handleWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultSize(false)
    if (!sizeSliderActive) { setSizeSliderActive(true) }
    debouncedSetWidth(Number(event.target.value))
  }

  const handleHeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDefaultSize(false)
    if (!sizeSliderActive) { setSizeSliderActive(true) }
    debouncedSetHeight(Number(event.target.value))
  }

  return (
    <Section className="relative bg-lunnheim-ivory-yellow pt-28">
      <FlexCol>
        <GapY gap-y-4 className="md:mx-auto">
          {sizeSliderActive ?
            (
              <DimensionsBox height={height} width={width} />
            ) :
            <ProductSliderContainer ref={sliderRef} className="">
              <div ref={keenRef} className="keen-slider relative">
                {selectedVariant && (
                  <>
                    <div className="keen-slider__slide w-max-[100vw]">
                      <Img
                        sizes="(max-width: 1700px) 100vw, 1700px"
                        image={selectedVariant.variantMainImage}
                        absoluteHotspot
                        eager
                        className=" mx-auto  aspect-[3/4] max-w-[95%]    rounded-[3.35rem]  object-cover"
                      />
                    </div>

                    {[
                      ...(selectedVariant.variantImageGallery || []),
                      ...(props.generalImageGallery || []),
                    ].map((image, index) => (
                      <div
                        key={index}
                        className="keen-slider__slide w-max-[100vw]"
                      >
                        <Img
                          sizes="(max-width: 1700px) 100vw, 1700px"
                          image={image}
                          eager
                          absoluteHotspot
                          className=" mx-auto  aspect-[3/4] max-w-[95%]    rounded-[3.35rem]  object-cover"
                        />
                      </div>
                    ))}
                  </>
                )}
              </div>
            </ProductSliderContainer>
          }
          {/* Image Size Slider */}
          {props.sizeConfigurable &&
            <div className="flex flex-col items-start justify-center border">
              <div className="mt-4 flex">
                <label className="mr-2">Width: {width} (cm)</label>
                <input
                  type="range"
                  min="60"
                  max="200"
                  onChange={handleWidthChange}
                  className="slider"
                />
              </div>
              <div className="mt-2 flex">
                <label className="mr-2">Height {height} (cm)</label>
                <input
                  type="range"
                  min="60"
                  max="200"
                  onChange={handleHeightChange}
                  className="slider"
                />
              </div>
              {sizeSliderActive && (
                <div className="flex gap-4">
                  <button className="mt-4 rounded border px-4" onClick={() => setSizeSliderActive(false)}>Done</button>
                  <button className="mt-4 rounded border px-4" onClick={() => {
                    setDefaultSize(true)
                    setWidth(initialWidth)
                    setHeight(initialHeight)
                  }}>Default size</button>
                </div>
              )
              }
            </div>
          }
          <FlexCol className="mx-auto  w-full max-w-[800px] self-center ">
            <Flex className="mx-auto h-8 w-full    max-w-[14rem] items-center justify-between  gap-x-0 transition-all  last:hidden">
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
                            "max-w-4 h-[3px]  w-full transition-all  " +
                            (currentSlide === idx
                              ? " bg-lunnheim-olive"
                              : " bg-lunnheim-pale-yellow")
                          }
                        ></button>
                      </div>
                    )
                  })}
                </>
              )}
            </Flex>
            <div className="w-full"></div>
          </FlexCol>
        </GapY>
        <GapY gap-y-6 className="bg-lunnheim-ivory-yellow  ">
          <Section className="">
            <Container className="md:px-6 ">
              <GapY gap-y-8 className="w-full">
                <GapY
                  gap-y-7
                  className="rounded-2xl  bg-opacity-20 text-center text-white"
                >
                  <Flex
                    gap-x-4
                    className="w-fit gap-x-4 place-self-center text-sm text-lunnheim-olive"
                  >
                    <FlexCol>
                      <Link href="/">Home</Link>
                    </FlexCol>
                    /
                    <FlexCol>
                      <Link href="/pieces">Pieces</Link>
                    </FlexCol>
                    /<FlexCol>
                      <Link href={`/categories/${props.pieceType?.slug}`}>{props.pieceType?.title}</Link>
                    </FlexCol>
                  </Flex>

                  <GapY gap-y-2>
                    <h4 className="hidden  font-sans text-xxs font-semibold uppercase tracking-widest text-lunnheim-olive">
                      Portachiavi
                    </h4>
                    <h2
                      data-dx="product-name"
                      className="font-serif text-3xl  text-lunnheim-dark-olive "
                    >
                      {displayTitle}
                    </h2>
                    <p
                      data-dx="product-price"
                      className="olive  font-sans text-xs uppercase text-lunnheim-dark-olive"
                    >
                      NOK {selectedVariant?.variantPrice ?? props.standardPrice},00
                    </p>
                  </GapY>
                  <Flex className="justify-between">
                    {/* <MaterialFilterTabs materials={props.materialTypes || []} onTabChange={handleMaterialChange} /> */}
                  </Flex>
                </GapY>
              </GapY>
            </Container>
          </Section>
          <Section className="flex flex-col gap-y-3">
            <ProductSwatches
              variants={props.variants}
              onVariantSelect={handleVariantSelect}
              selectedMaterial={selectedMaterial}
              activeVariant={selectedVariant}
            />
            <ProductSelected
              variantColor={selectedVariant?.variantColor}
              variant={selectedVariant?.name}
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
                  <button
                    data-dx="add-to-cart-btn"
                    onClick={handleAddToCart}
                    className="w-full rounded-xl bg-lunnheim-dark-olive px-6 py-3 text-xs text-lunnheim-pale-yellow  transition duration-300 hover:opacity-80"
                  >
                    Add to bag
                  </button>
                  {/* <ProductCtaButtons /> */}
                </GapY>
                <ShippingSection />
              </GapY>
            </Container>
          </Section>

          {props.dimensions && (
            <ProductAccordions dimensions={props.dimensions} description={props.details} />

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
      </FlexCol>
    </Section >
  )
}
