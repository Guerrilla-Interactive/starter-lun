import {
  FlexCol,
  FlexRow,
  GapY,
  Section,
} from "@/src/components/nextgen-core-ui"

export const SpecialistSection: React.FC = () => {
  return (
    <FlexCol className="w-full items-center pt-6 text-center text-xxs tracking-wider  text-lunnheim-dark-olive">
      <GapY gap-y-6>
        <GapY className="items-center" gap-y-3>
          <FlexRow className="text-center font-serif text-lg">
            Work with a specialist
          </FlexRow>
          <FlexRow className="leading-6 tracking-widest opacity-70">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec
            odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
            Suspendisse urna nibh viverra non semper suscipit posuere a pede.
          </FlexRow>
        </GapY>
        <GapY gap-y-3>
          <button
            data-dx="add-to-cart-btn"
            className="w-full rounded-lg border-[1px] border-lunnheim-dark-olive border-opacity-50 bg-lunnheim-ivory-yellow px-6 py-4 text-xxs font-medium uppercase tracking-widest text-lunnheim-black opacity-70 transition duration-300 hover:border-opacity-100 hover:opacity-100"
          >
            Book an appointment
          </button>

          <button
            data-dx="add-to-cart-btn"
            className="w-full rounded-lg border-[1px] border-lunnheim-dark-olive border-opacity-50 bg-lunnheim-ivory-yellow px-6 py-4 text-xxs font-medium uppercase tracking-widest text-lunnheim-black opacity-70 transition duration-300 hover:border-opacity-100 hover:opacity-100"
          >
            Start a chat
          </button>
        </GapY>
      </GapY>
    </FlexCol>
  )
}
