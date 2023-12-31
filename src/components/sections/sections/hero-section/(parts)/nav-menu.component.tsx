"use client"
import { List } from "@phosphor-icons/react"

import { LunnheimSymbol } from "@/sanity/desk/theme/lunnheim-symbol.component"
import {
  Container,
  FlexCol,
  FlexRow,
  InnerSection,
  Section,
} from "@/src/components/nextgen-core-ui"
import { COLORS } from "@/src/styles/theme"

export const NavMenu: React.FC = () => {
  return (
    <Section className="absolute top-0 z-10 w-full py-4">
      <Container className="flex-row items-center">
        <FlexCol className="w-full md:hidden ">
          <List color={COLORS.LUNNHEIM_PALE_YELLOW} size={32} weight="light" />
        </FlexCol>
        <FlexCol className="hidden w-full md:flex">
          <nav>
            <ul className="flex flex-row  gap-x-8">
              <li className="font-serif text-xl font-extralight text-lunnheim-ivory-yellow">
                Pieces
              </li>
              <li className="font-serif text-xl font-extralight text-lunnheim-ivory-yellow">
                About
              </li>
              <li className="font-serif text-xl font-extralight text-lunnheim-ivory-yellow">
                Journal
              </li>
            </ul>
          </nav>
        </FlexCol>
        <FlexCol className="self-center">
          <LunnheimSymbol />
        </FlexCol>
        <FlexCol className="w-full items-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            fill={COLORS.LUNNHEIM_PALE_YELLOW}
            viewBox="0 0 256 256"
          >
            <path d="M233,72.06A12.11,12.11,0,0,0,223.92,68H172V64a44,44,0,0,0-88,0v4H32.08A12.11,12.11,0,0,0,23,72.06a12,12,0,0,0-2.94,9.35l14.26,120a12,12,0,0,0,12,10.59H209.67a12,12,0,0,0,12-10.59l14.26-120A12,12,0,0,0,233,72.06ZM92,64a36,36,0,0,1,72,0v4H92ZM228,80.46l-14.25,120a4,4,0,0,1-4.05,3.54H46.33a4,4,0,0,1-4-3.54L28,80.46a3.9,3.9,0,0,1,1-3.09A4.08,4.08,0,0,1,32.08,76H223.92A4.08,4.08,0,0,1,227,77.37,3.9,3.9,0,0,1,228,80.46Z"></path>
          </svg>
        </FlexCol>
      </Container>
    </Section>
  )
}
