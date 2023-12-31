"use client"

import { FrontPageComponent } from "./frontpage.component";
import { frontPageQuery } from "./front-page.query";
import { PreviewLoadingErrorHOC } from "@/src/components/sanity/preview-loading-error-hoc"
import { PageQuery } from "../[slug]/page.query";

export default function FrontPagePreviewComponent({ initial }: { initial: PageQuery }) {
  return (
    <PreviewLoadingErrorHOC
      initial={initial}
      query={frontPageQuery.query}
      successFn={(data) =>
        <FrontPageComponent {...data} />
      }
    />
  )
}
