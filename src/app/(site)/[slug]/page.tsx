import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

import { generatePageMeta } from "@/lib/generate-page-meta.util"
import { tClient } from "@/lib/sanity/groqd-client"

import { PageComponent } from "./page.component"
import { PagePreview } from "./page.preview"
import { pageQuery } from "./page.query"

type Props = {
  params: {
    slug: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const data = await tClient(pageQuery, {
    ...params,
  })

  return generatePageMeta(data?.metadata)
}

const PagePage = async ({ params }: Props) => {

  const data = await tClient(pageQuery, {
    ...params,
  })

  if (!data) {
    return notFound()
  }

  if (draftMode().isEnabled) {
    return (
      <PagePreview
        queryParams={params}
        initial={data}
      />
    )
  }

  return <PageComponent {...data} />
}

export default PagePage
