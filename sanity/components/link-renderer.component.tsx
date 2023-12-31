import { ArrowUpRight, Link } from "@phosphor-icons/react"
import type { BlockAnnotationProps } from "sanity"

export const LinkRenderer = (props: BlockAnnotationProps) => {
  return (
    <span>
      <>
        {props.renderDefault(props)}
        <span
          style={{
            margin: "0 0.25rem",
          }}
        ></span>
        {props.value._type === "internalLinkObject" ? (
          <Link />
        ) : (
          <ArrowUpRight />
        )}
      </>
    </span>
  )
}
