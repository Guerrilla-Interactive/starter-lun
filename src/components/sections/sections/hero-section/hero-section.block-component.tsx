"use client"

import { CaretRight } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"

import { H1 } from "@/components/layout/heading.component"
import { PageQuery } from "@/src/app/(site)/[slug]/page.query"
import { useGlobalContext } from "@/src/context/global-context"
import { Button } from "@/src/components/button/button.component"
import { Img } from "@/src/components/image-component/img.component"
import {
  Absolute,
  Container,
  Flex,
  FlexCol,
  GapY,
  Relative,
  Section,
  Sticky,
} from "@/src/components/nextgen-core-ui"
import { LinkResolver } from "@/src/components/utils/link-resolver.component"

import HeroContent from "./hero-content.component"

export const HeroSectionComponent = (props: PageQuery) => {
  const sliderRef = useRef<HTMLDivElement>(null)

  const [, setSliderHeight] = useState(0)
  const { globalData, setGlobalData } = useGlobalContext()
  const { headerData } = globalData

  useEffect(() => {
    const updateSliderHeight = () => {
      if (sliderRef.current) {
        const newHeight = sliderRef.current.offsetHeight
        setSliderHeight(newHeight)
        // Update the global context with the new height
        setGlobalData((prev) => ({
          ...prev,
          headerData: {
            ...prev.headerData,
            heroSectionHeight: newHeight,
          },
        }))
      }
    }

    updateSliderHeight()
    window.addEventListener("resize", updateSliderHeight)

    return () => {
      window.removeEventListener("resize", updateSliderHeight)
    }
  }, [sliderRef, setGlobalData])

  // console.log(props);

  return (
    <>
      <Section style={{}} className="relative">
        <Absolute className=" z-[-20] w-full  bg-slate-800" top>
          <Relative className="min-h-[200vh] ">
            <Sticky
              style={{ paddingTop: globalData.headerData.headerHeight }}
              className="-z-20 h-full w-full "
              top={0}
            >
              <div style={{ height: globalData.headerData.headerHeight }} />
              <div
                ref={sliderRef}
                className="left-0 top-0 h-full min-h-[90vh] w-full  pt-48"
              >
                {props?.heroSection?.image && (
                  <Img
                    image={props.heroSection.image}
                    eager
                    className="absolute left-0 top-0 h-full w-full object-cover"
                  />
                )}
              </div>
            </Sticky>
          </Relative>
          <Absolute className="group z-40 h-full w-full opacity-100">
            <div className="  left-0 top-0 h-1/2 w-full bg-gradient-to-t from-[#0000008e] via-[#00000080]   to-[#00000000] opacity-40 transition-all duration-300"></div>
            <div className="  bottom-0 left-0 h-1/2 w-full bg-gradient-to-t from-[#00000000] via-[#00000080]   to-[#0000008e] opacity-20 transition-all duration-300"></div>
          </Absolute>
        </Absolute>
        <HeroContent
          className="min-h-[90vh]"
          animated
          height={headerData.heroSectionHeight}
        >
          <Container className="text-background h-full w-full">
            <FlexCol className="h-full w-full max-w-2xl content-end pb-12">
              {props?.heroSection?.hideTitle !== true && (
                <GapY className="mt-auto" gap-y-6>
                  <H1 className="">
                    {props?.heroSection?.title ?? props.title ?? null}
                  </H1>
                  {props.heroSection?.subtitle && (
                    <p>{props.heroSection?.subtitle}</p>
                  )}
                  {props?.heroSection?.links && (
                    <Flex className="z-30 w-full flex-wrap gap-4">
                      {props?.heroSection?.links?.map((link, key) => (
                        <LinkResolver
                          linkType="internal"
                          link={link?.link}
                          key={key}
                          className=""
                        >
                          <Button variant="secondary">
                            {link?.link?.title}{" "}
                            <CaretRight className="ml-2 h-4 w-4 transition-all group-hover:ml-3" />
                          </Button>
                        </LinkResolver>
                      ))}
                    </Flex>
                  )}
                </GapY>
              )}
            </FlexCol>
          </Container>
        </HeroContent>
      </Section>
    </>
  )
}
