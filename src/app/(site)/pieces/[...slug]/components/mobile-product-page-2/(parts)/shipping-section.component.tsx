import { FlexCol, FlexRow } from "@/src/components/nextgen-core-ui"

export const ShippingSection: React.FC = () => {
  return (
    <FlexCol className="w-full items-center gap-y-3 text-left text-xxs tracking-wider text-lunnheim-dark-olive">
      {/* <FlexRow className="uppercase font-bold">Shipped white glove delivery</FlexRow> */}
      <FlexRow className="tracking-widest opacity-70">
        Estimated delivery in 19-25 weeks
      </FlexRow>
    </FlexCol>
  )
}
