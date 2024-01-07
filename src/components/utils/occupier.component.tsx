import type { PropsWithChildren } from "react"

import { Container } from "../nextgen-core-ui"

export const Occupier = ({
  children,
  container,
}: PropsWithChildren<{ container?: boolean }>) => {
  const Tag = container ? Container : "div"

  return (
    <Tag>
      <div className="border-dark/30 text-dark/60 flex min-h-[10rem] items-center justify-center rounded border border-dashed p-5 text-center">
        <p>{children}</p>
      </div>
    </Tag>
  )
}
