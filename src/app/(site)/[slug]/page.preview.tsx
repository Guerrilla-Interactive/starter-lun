"use client"

import { PageComponent } from "./page.component"
import type { PageQuery } from "./page.query"
import { pageQuery } from "./page.query"
import { PreviewLoadingErrorHOC } from "@/src/components/sanity/preview-loading-error-hoc"

export const PagePreview = ({
  initial,
  queryParams,
}: {
  initial: PageQuery
  queryParams: { slug: string }
}) => {
  return (
    <PreviewLoadingErrorHOC
      initial={initial}
      query={pageQuery.query}
      queryParams={queryParams}
      successFn={(data) =>
        <PageComponent {...data} />
      }
    />
  )
}
