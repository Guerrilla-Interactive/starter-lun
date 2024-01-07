"use client"

import { PreviewLoadingErrorHOC } from "@/src/components/sanity/preview-loading-error-hoc"

import type { PageQuery } from "../[slug]/page.query";
import { frontPageQuery } from "./front-page.query";
import { FrontPageComponent } from "./frontpage.component";

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
