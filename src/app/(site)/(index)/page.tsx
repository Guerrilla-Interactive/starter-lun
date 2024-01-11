import { draftMode } from "next/headers"
import { notFound } from "next/navigation"

import { generatePageMeta } from "@/lib/generate-page-meta.util"
import { tClient, tClientDraft } from "@/sanity/groqd-client"

import { frontPageQuery } from "./front-page.query"
import { FrontPageComponent } from "./frontpage.component"
import dynamic from "next/dynamic"

type Props = {
  params: {
    slug: string
  }
}

const FrontPagePreviewComponent = dynamic(() => import("./frontpage.preview"))

export const generateMetadata = async ({ params }: Props) => {
  const data = await tClient(frontPageQuery, {
    ...params,
  })

  return generatePageMeta(data?.metadata)
}

const IndexPage = async () => {
  const data = await tClient(frontPageQuery)
  const draftData = await tClientDraft(frontPageQuery)

  if (!data) {
    return notFound()
  }

  return draftMode().isEnabled ? <FrontPagePreviewComponent initial={draftData!} /> : <FrontPageComponent {...data} />
}



export default IndexPage
