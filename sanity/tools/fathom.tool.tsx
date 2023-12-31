import { ChartLine } from "@phosphor-icons/react"

import { FathomIframe } from "./fathom-iframe.component"
export const fathomTool = () => {
  return {
    title: "Analytics",
    name: "fathom", // localhost:3333/my-custom-tool
    icon: ChartLine,
    component: FathomIframe,
  }
}
