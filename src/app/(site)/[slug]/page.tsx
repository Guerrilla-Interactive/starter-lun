import { draftMode } from "next/headers"
import { notFound } from "next/navigation"
import dynamic from "next/dynamic"

import { generatePageMeta } from "@/lib/generate-page-meta.util"
import { tClient, tClientDraft } from "@/sanity/groqd-client"

import { PageComponent } from "./page.component"
import { pageQuery } from "./page.query"

type Props = {
  params: {
    slug: string
  }
}

// Lazily load the preview component for performance reasons
const PagePreview = dynamic(() => import('./page.preview'))

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
  const draftData = await tClientDraft(pageQuery, {
    ...params,
  })

  if (!data) {
    return notFound()
  }

  if (draftMode().isEnabled) {
    return (
      <PagePreview
        queryParams={params}
        initial={draftData!}
      />
    )
  }

  return <PageComponent {...data} />
}

export default PagePage
