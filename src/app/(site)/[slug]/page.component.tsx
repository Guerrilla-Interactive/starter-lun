"use client"

import { H2, H4 } from "@/components/layout/heading.component"
import { PageQuery } from "./page.query"
import {
  Absolute,
  Container,
  GapY,
  Relative,
  Section,
  Sticky,
  VerticalSpace,
} from "@/src/components/nextgen-core-ui"
import { useEffect, useRef, useState } from "react"
import { useGlobalContext } from "@/src/context/global-context"
import { CategoryFilterSlider } from "@/src/components/category-filter-slider/category-filter-slider.component"
import { RoundedDivider } from "@/src/components/sections/sections/hero-section/(parts)/rounded-divider.component"
import ImageFrameCalculator from "@/src/components/image-frame-calculator/image-frame-calculator.component"
import { Img } from "@/src/components/utils/img.component"
import { Input } from "@/src/components/input/input.component"
import { PieceType } from "../pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries"

export const PageComponent = (props: PageQuery) => {
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

  const [activeCategory, setActiveCategory] = useState<PieceType | null>(null)
  const { title } = props
  return (
    <>
      <Section className="bg-lunnheim-ivory-yellow ">
        <Absolute className="pointer-events-auto z-[-20] w-full" top>
          <Relative className="h-[185vh]">
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
                    <Img
                      image={props.heroSection.image}
                      eager
                      absoluteHotspot
                      width={2440}
                      height={1440}
                      className="absolute left-0 top-0 h-full w-full object-cover"
                    />
                  </>
                )}
              </div>
            </Sticky>
          </Relative>
        </Absolute>
        <VerticalSpace
          className="pointer-events-none relative z-30"
          animated
          height={globalData.headerData.heroSectionHeight}
        />
      </Section>
      <Section className="flex flex-col gap-y-14 bg-lunnheim-ivory-yellow py-16 pt-14 ">
        <CategoryFilterSlider
          style={{
            paddingLeft: globalData.screenData.defaultContainerMarginX,
          }
          }
          pieces={props?.pieces as any}

          categories={props.categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
        <Container></Container>
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
        <RoundedDivider color="lunnheim-pale-yellow" bottom verticalFlip />
      </Section>

      <Section className="h-full bg-lunnheim-pale-yellow">
        {/* A Image Frame with the size of the image on top, and on right side. The metric, for example 67cm height should be displayed on top of a line that goes from bottom of frame to top of frame on the right side. Also the same idea on top, but horizontally. Below the frame, it's a slider which is able to manipulate the size of the frame. The height and width should be visually represented in both the CM metric and the actual size of the div */}
        <Container ref={containerRef} className="w-full py-24">
          <GapY gap-y-8>
            <ImageFrameCalculator initialHeight={100} initialWidth={100} />
          </GapY>
        </Container>
      </Section>

      <Section className="relative z-30 bg-lunnheim-pale-yellow  ">
        <RoundedDivider color="lunnheim-pale-yellow" top />
        <Container
          ref={containerRef}
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
      <Section className="h-full bg-lunnheim-light-pink">
        <Container ref={containerRef} className="w-full py-64">
          <GapY gap-y-8>

            <Input label={""} />
          </GapY>
        </Container>
      </Section>
    </>
  )
}
