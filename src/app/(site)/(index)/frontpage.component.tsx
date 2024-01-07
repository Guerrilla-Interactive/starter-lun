"use client"



import { useEffect, useRef, useState } from "react"


import { H2, H3, H4 } from "@/components/layout/heading.component"
import { AllCategoryPieceType, CategoryFilterSlider } from "@/src/components/category-filter-slider/category-filter-slider.component"
import {
  Absolute,
  Container,
  FlexCol,
  FlexRow,
  GapY,
  Relative,
  Section,
  Sticky,
  VerticalSpace,
} from "@/src/components/nextgen-core-ui"
import { PieceGrid } from "@/src/components/piece-grid/piece-grid.component"
import { RoundedDivider } from "@/src/components/sections/sections/hero-section/(parts)/rounded-divider.component"
import { Img } from "@/src/components/utils/img.component"

import { useGlobalContext } from "@/src/context/global-context"
import type { PageQuery } from "../[slug]/page.query"
import {
  PieceType,
} from "../pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries"
import { Input } from "@/src/components/input/input.component"

export const FrontPageComponent = (props: PageQuery) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const { globalData, setGlobalData } = useGlobalContext()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function updateDimensions() {
      setGlobalData((prevData) => ({
        ...prevData,
        screenData: {
          ...prevData.screenData,
          screenWidth: window.innerWidth,
          screenHeight: window.innerHeight,
        },
        headerData: {
          ...prevData.headerData,
          heroSectionHeight: heroRef?.current?.offsetHeight,
        },
      }))
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        setGlobalData((prevData) => ({
          ...prevData,
          screenData: {
            ...prevData.screenData,
            defaultContainerWidth: containerWidth,
            defaultContainerMarginX: (window.innerWidth - containerWidth) / 2,
          },
          headerData: {
            ...prevData.headerData,
            heroSectionHeight: heroRef?.current?.offsetHeight,
          },
        }))
      }
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [containerRef, setGlobalData])

  const [activeCategory, setActiveCategory] = useState<PieceType>(AllCategoryPieceType)


  return (
    <>
      <Section className="bg-lunnheim-ivory-yellow">
        <Absolute className="-z-50 w-full" top>
          <Relative className="-z-50 h-[185vh]">
            <Sticky className="" top={0}>
              <div ref={heroRef} className="relative h-[80vh]  max-w-[100vw] ">
                {props?.heroSection?.image && (
                  <>
                    {props.heroSection.title && (
                      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center  text-lunnheim-dark-olive">
                        <div className="relative z-10">
                          <H2 size={1} className="text-center font-serif ">
                            {props.heroSection.title}
                          </H2>
                          <H4 className="text-center font-sans">
                            {props.heroSection.subtitle}
                          </H4>
                        </div>
                      </div>
                    )}

                    <div className="absolute bottom-4 left-0 flex h-full w-full items-end justify-center text-white  ">
                      <FlexCol className="relative z-10 gap-y-2">
                        <FlexRow className="font-thin"></FlexRow>
                        <FlexRow className="h-6  w-[1px]  max-w-[1px]  animate-expand-contract place-self-center self-center bg-lunnheim-ivory-yellow "></FlexRow>
                      </FlexCol>
                    </div>
                    <Img
                      image={props.heroSection.image}
                      eager
                      absoluteHotspot
                      disableLqip
                      sizes="(max-width: 2440px) 100vw, 2440px"
                      className="absolute left-0 top-0 h-full w-full object-cover"
                    />
                  </>
                )}
              </div>
            </Sticky>
          </Relative>
        </Absolute>
        <VerticalSpace
          className="relative z-30"
          animated
          height={globalData.headerData.heroSectionHeight}
        />
      </Section>
      <Section className="flex flex-col  bg-lunnheim-ivory-yellow py-24  pt-12 ">
        <CategoryFilterSlider
          style={{
            paddingLeft: globalData.screenData.defaultContainerMarginX,
          }}
          pieces={props?.pieces as any}
          categories={props.categories}
          activeCategory={activeCategory}
          setActiveCategory={(newCategory) => setActiveCategory(newCategory)}
        />

        <PieceGrid
          pieces={props.pieces as any}
          activeCategory={activeCategory}
        />
      </Section>

      <Section className="relative z-30 bg-lunnheim-pale-yellow text-lunnheim-darker-olive  ">
        <RoundedDivider color="lunnheim-pale-yellow" top />

        <Container
          ref={containerRef}
          className="max-w-xl items-center  justify-center py-14 text-center font-serif text-xl "
        >
          <svg
            width="35"
            height="52"
            className="mb-4"
            viewBox="0 0 40 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 52C31.0514 52 40 40.3701 40 26C40 11.6299 31.0514 0 20 0C8.94863 0 0 11.6299 0 26C0 40.3701 8.94863 52 20 52ZM20 50.882C10.0769 50.882 2.05183 39.1399 2.05183 26C2.05183 12.8601 10.0769 1.11803 20 1.11803C29.9231 1.11803 37.9482 12.8879 37.9482 26C37.9482 39.1121 29.8966 50.882 20 50.882Z"
              fill="#474224"
            />
            <path
              d="M12.7061 34.0557C12.7061 34.0557 15.7101 34.089 16.2355 34.0557C16.7608 34.0225 16.1827 31.5317 16.2355 30.3762C16.3531 27.799 17.6608 25.8149 19.4119 26C20.5162 26.1167 22.6614 26.1287 23.1766 29.3842C23.3876 30.7168 23.1766 34.0557 23.1766 34.0557L27.0693 34.0557L26.8449 29.6042C26.8449 29.6042 26.853 27.8691 26.8449 26.6435C26.835 25.1433 27.0693 22.7822 27.0693 22.7822L27.5182 19.0732L24.1708 18.0198L24.2545 20.7705L20.2795 19.0732L12.7061 23.6084V34.0557Z"
              fill="#474224"
            />
          </svg>

          <H4>Heart at home</H4>
          <H2 size={1}>Embrace Lunnheim</H2>
        </Container>





        <Container declarativeOnly className="md:max-w-screen-wide md:container max-w-[100vw] justify-center items-center place-items-center mx-auto self-center" >
          <Img
            image={props?.heroSection?.image as any}
            className="mx-auto"
            sizes="(max-width: 2440px) 100vw, 2440px"
          />
        </Container>






        <RoundedDivider color="lunnheim-pale-yellow" top />
        <Container

          className="max-w-xl py-24 text-center  font-serif text-xl "
        >

          <p>
            Lunnheim, the emblematic Norwegian furniture brand, embodies the
            tranquil elegance of Scandinavian design, fused with a narrative
            that echoes through the serene fjords and expansive northern skies.
            With a design philosophy deeply rooted in simplicity and
            functionality, each creation is a tribute to timeless aesthetics and
            the unyielding essence of the north.
          </p>
        </Container>
        <RoundedDivider color="lunnheim-pale-yellow" bottom verticalFlip />
      </Section>


















      <Section className=" border-lunnheim-dark-olive border-opacity-25   py-6">
        <Container maxWidth='wide' className="border-l border-r border-b border-lunnheim-dark-olive w-full  border-opacity-25  min-h-[40rem] flex py-24 flex-col ">
          <Container maxWidth="narrow" className="text-center">

          </Container>
          <Container maxWidth="wide" className="text-center relative">
            <FlexRow className="w-full justify-around items-center gap-x-80 min-h-[35rem]">

              <FlexCol className="content-center justify-center rtl h-full pl-14">
                <h2 className="text-4xl gap-y-3 font-serif font-light text-right flex justify-end  flex-col">
                  <FlexRow className="self-end justify-self-end">
                    About
                  </FlexRow>
                  <FlexRow className="self-end justify-self-end">
                    Pieces
                  </FlexRow>
                  <FlexRow className="self-end ">
                    Journal
                  </FlexRow>
                </h2>
              </FlexCol>

              <Absolute className="w-[30rem] h-[15rem] bg-lunnheim-dusty-pink bg-opacity-50 my-auto top-[20%] rounded-full left-0 right-0 mx-auto origin-center">

              </Absolute>
              <Absolute className="w-[30rem] h-[15rem] bg-lunnheim-vibrant-yellow bg-opacity-50 my-auto top-[35%] rounded-full left-0 right-0 mx-auto origin-center">

              </Absolute>
              <Absolute className="w-[30rem] h-[15rem] bg-lunnheim-olive bg-opacity-50 my-auto top-[50%] rounded-full left-0 right-0 mx-auto origin-center">

              </Absolute>





              <FlexCol className="content-center justify-center rtl h-full">
                <h2 className="text-base gap-y-1 font-serif font-light text-right flex justify-end  flex-col">
                  <FlexRow>
                    Lunnheim, sweet home.
                  </FlexRow>
                  <FlexRow>
                    The interplay of nature and the city
                  </FlexRow>
                  <FlexRow>
                    A neighborhood with
                  </FlexRow>
                  <FlexRow>
                    a distinctive culture of mixing
                  </FlexRow>



                </h2>
              </FlexCol>
            </FlexRow>
          </Container>

        </Container>
      </Section>









      <Section className="h-full ">
        <Container ref={containerRef} className="w-full py-44 text-center max-w-2xl">

          <GapY gap-y-8>

            <FlexCol className="gap-y-4 items-center">
              <svg width="46" height="50" viewBox="0 0 36 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 43C27.9462 43 36 33.3829 36 21.5C36 9.61707 27.9462 0 18 0C8.05376 0 0 9.61707 0 21.5C0 33.3829 8.05376 43 18 43ZM18 42.0755C9.06919 42.0755 1.84665 32.3657 1.84665 21.5C1.84665 10.6343 9.06919 0.924523 18 0.924523C26.9308 0.924523 34.1534 10.6573 34.1534 21.5C34.1534 32.3427 26.907 42.0755 18 42.0755Z" fill="#474224" />
                <g clipPath="url(#clip0_232_2)">
                  <path d="M18.1127 16.0095C18.3158 15.9955 18.7091 15.9955 18.9079 16.0095C19.9667 16.0747 24.5043 17.1643 25.9347 17.453C24.7722 18.403 21.06 21.9513 20.1914 22.5427C18.7912 23.5019 17.8059 23.3203 16.4965 22.3052L11.0859 17.453C11.5311 17.3087 11.9935 17.2062 12.4472 17.1085C13.3461 16.9082 17.5725 16.0421 18.1127 16.0095Z" fill="#474224" />
                  <path d="M20.5454 23.6133L24.3613 27.9625L24.3267 27.9998L12.6543 27.9858L16.4054 23.6366C16.6215 23.59 18.2161 25.2105 20.5411 23.6133H20.5454Z" fill="#474224" />
                  <path d="M11.0346 18.9429L15.5376 22.9848C14.3103 24.3305 13.1564 25.7601 11.9291 27.1105C11.8557 27.1943 11.0648 28.107 11 27.9906L11.0346 18.9429Z" fill="#474224" />
                  <path d="M25.9913 18.9194L26.0043 27.9672C25.9265 28.0882 25.2005 27.2454 25.1184 27.1569C23.8738 25.7972 22.7026 24.3537 21.4883 22.9613L25.9913 18.9194Z" fill="#474224" />
                </g>
                <defs>
                  <clipPath id="clip0_232_2">
                    <rect width="15" height="12" fill="white" transform="translate(11 16)" />
                  </clipPath>
                </defs>
              </svg>

              <H3 className="   text-lunnheim-dark-olive font-serif  ">Take a piece with you</H3>
              <p className="opacity-60 font-light font-serif text-xl">Get updates about our latest pieces</p>
            </FlexCol>
            <Input label="Email address" />
            <span className="px-12 py-2 rounded-md bg-lunnheim-olive text-lunnheim-ivory-yellow  max-w- mx-auto text-sm">Subscribe</span>
          </GapY>
        </Container>
      </Section>






















    </>
  )
}
