import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/accordion/accordion.component"
import {
  Container,
  Flex,
  FlexCol,
  FlexRow,
  GapY,
} from "@/src/components/nextgen-core-ui"
import { PortableText } from "@/src/components/portable-text/portable-text.component"

type Dimension = {
  title: string
  value: string
}

type ProductAccordionsProps = {
  dimensions?: Dimension[]
  description?: any
}

export const ProductAccordions: React.FC<ProductAccordionsProps> = (props) => {
  return (
    <Container className="z-20  py-2 pb-12 text-lunnheim-darker-olive  md:px-6 ">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-2">
          <AccordionTrigger className="!text-xs  tracking-wide  text-lunnheim-dark-olive">
            Description
          </AccordionTrigger>
          <AccordionContent>
            <GapY gap-y-6 className="pb-6">
              <FlexCol className="list-inside gap-y-6 text-xs leading-5 tracking-wide">
                <PortableText content={props.description} />
              </FlexCol>
            </GapY>
          </AccordionContent>
        </AccordionItem>
        {props.dimensions && (
          <AccordionItem value="item-1">
            <AccordionTrigger className="!text-xs  tracking-wide  text-lunnheim-dark-olive">
              Dimensions
            </AccordionTrigger>
            <AccordionContent>
              <GapY gap-y-6>
                <GapY gap-y-0>
                  {props.dimensions.map((dimension, index) => (
                    <Flex
                      key={index}
                      className="my-auto items-center border-b-[1px]  border-lunnheim-pale-yellow border-opacity-50 py-4 last-of-type:border-b-0"
                    >
                      <FlexCol className="w-[35%] text-xxs opacity-50">
                        {dimension.title}
                      </FlexCol>
                      <FlexCol className="text-xxs">{dimension.value}</FlexCol>
                    </Flex>
                  ))}
                </GapY>
              </GapY>
            </AccordionContent>
          </AccordionItem>
        )}

        {/* <AccordionItem value="item-3">
                    <AccordionTrigger className="">Shipping & returns policy</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                </AccordionItem> */}
      </Accordion>
    </Container>
  )
}
