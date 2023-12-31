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

type Dimension = {
  title: string
  value: string
}

type ProductAccordionsProps = {
  dimensions?: Dimension[]
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
                <li className="list-outside">
                  Finely crafted from kiln-dried khaya wood with a hand-applied
                  finish. Upholstered by hand.
                </li>
                <li>
                  This benchmade piece is individually produced and finished
                  with the highest level of handcraftsmanship. All joints,
                  braces, and corners are double doweled with reinforcements for
                  lasting strength and durability.
                </li>
                <li>
                  One spring-down seat cushion and one oxford down back pillow.
                  Comes with one feather-down kidney throw pillow composed of
                  90% down and 10% feathers.
                </li>
                <li>
                  The Elite® spring-down seat cushion features a coiled spring
                  core nested in premium foam. Down, feather, and polyester
                  fibers fill the outermost layer, which is protected by
                  down-proof ticking.
                </li>
                <li>
                  The oxford down back pillow is crafted with a down-and-fiber
                  fill and features two double layers of down-proof ticking.
                </li>
                <li>
                  This piece employs an eight-way hand-tied construction. Each
                  coil is expertly tied by hand in eight different directions,
                  affording superior flexibility, support, and comfort.
                </li>
                <li>Imported. Upholstered in USA.</li>
                <li>Style Number: 100001098</li>
                <li>RL Number: RLU891-03</li>
              </FlexCol>
              <FlexRow className="gap-y-2 pt-4 font-serif text-lg">
                Product Care
              </FlexRow>
              <FlexRow className="text-xs leading-5 tracking-wide">
                Below are easy steps for extending the life and beauty of your
                piece. Visit here for additional Product Care information.
              </FlexRow>
              <FlexCol className="list-inside gap-y-6 text-xs leading-5 tracking-wide">
                <li className="list-outside">
                  Finely crafted from kiln-dried khaya wood with a hand-applied
                  finish. Upholstered by hand.
                </li>
                <li>
                  This benchmade piece is individually produced and finished
                  with the highest level of handcraftsmanship. All joints,
                  braces, and corners are double doweled with reinforcements for
                  lasting strength and durability.
                </li>
                <li>
                  One spring-down seat cushion and one oxford down back pillow.
                  Comes with one feather-down kidney throw pillow composed of
                  90% down and 10% feathers.
                </li>
                <li>
                  The Elite® spring-down seat cushion features a coiled spring
                  core nested in premium foam. Down, feather, and polyester
                  fibers fill the outermost layer, which is protected by
                  down-proof ticking.
                </li>
                <li>
                  The oxford down back pillow is crafted with a down-and-fiber
                  fill and features two double layers of down-proof ticking.
                </li>
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
                <FlexRow className="py-4 font-serif text-lg">Product</FlexRow>
                <GapY gap-y-0>
                  {props.dimensions.map((dimension, index) => (
                    <Flex
                      key={index}
                      className="my-auto items-center items-center border-b-[1px] border-lunnheim-pale-yellow border-opacity-50 py-4"
                    >
                      <FlexCol className="w-[35%] text-xxs opacity-50">
                        {dimension.title}
                      </FlexCol>
                      <FlexCol className="text-xxs">{dimension.value}</FlexCol>
                    </Flex>
                  ))}
                </GapY>

                <FlexCol className="py-10 ">
                  <GapY className="items-center" gap-y-8>
                    <Flex className="gap-x-1 self-end text-xxs">
                      <FlexCol className="opacity-50">IN</FlexCol>
                      <FlexCol className="opacity-50">|</FlexCol>
                      <FlexCol className="">CM</FlexCol>
                    </Flex>
                    <FlexRow className="tracking-widest ">
                      Will this piece fit your space?
                    </FlexRow>
                    <FlexCol className="group cursor-pointer gap-y-1 hover:opacity-100">
                      <FlexRow className="font-mono text-xs uppercase  tracking-wide  group-hover:opacity-100">
                        Download specifications
                      </FlexRow>
                      <FlexRow className="h-[1px] w-full  bg-black opacity-40 group-hover:opacity-70"></FlexRow>
                    </FlexCol>
                  </GapY>
                </FlexCol>
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
