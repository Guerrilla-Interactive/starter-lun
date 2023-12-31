"use client"
import { Section } from "@/src/components/nextgen-core-ui"
import ScrollVideo from "@/src/components/video-scroller"

export const ScrollVideoSection: React.FC = () => {
  return (
    <>
      <Section className="min-h-[40vh] bg-lunnheim-ivory-yellow">
        <ScrollVideo />
      </Section>
    </>
  )
}
