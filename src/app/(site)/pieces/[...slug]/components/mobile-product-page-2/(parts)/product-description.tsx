import React from "react"
import {
  Container,
  FlexCol,
  FlexRow,
  GapY,
  Relative,
  Section,
} from "@/src/components/nextgen-core-ui"
import { Img } from "@/src/components/utils/img.component"

type ProductDescriptionProps = {
  generalImageGallery?: any // Replace 'any' with the exact type of the image if known
  description: string
}

export const ProductDescription: React.FC<ProductDescriptionProps> = ({
  generalImageGallery,
  description,
}) => {
  return (
    <Section className=" bg-lunnheim-pale-yellow bg-opacity-20 py-14 ">
      <GapY gap-y-10>
        <Container className="z-20 md:px-8">
          <FlexRow>
            <FlexCol>
              <GapY gap-y-6>
                <FlexRow className="text-xxs uppercase tracking-widest  text-lunnheim-dark-olive">
                  In the wild
                </FlexRow>
                <p
                  data-dx="product-description"
                  className="mb-6 font-serif text-[15px] text-lunnheim-dark-olive"
                >
                  {description}
                </p>
              </GapY>

              {/* Image Gallery Section */}
              {generalImageGallery && (
                <div className="mt-6 grid grid-cols-2 gap-4">
                  {generalImageGallery.map((image: any, idx: number) => (
                    <Img
                      key={idx}
                      sizes="(max-width: 850px) 100vw, 850px"
                      image={image}
                      eager
                      className="h-auto w-full object-cover"
                    />
                  ))}
                </div>
              )}
            </FlexCol>
          </FlexRow>
        </Container>
      </GapY>
    </Section>
  )
}
