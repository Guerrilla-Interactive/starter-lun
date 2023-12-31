import { draftMode } from "next/headers"
import { z } from "zod"

import { resolvePath } from "@/lib/navigation/resolve-path.util"
import { paramsToObject } from "@/utils/params-to-object.util"

const validator = z.object({
  slug: z.string().optional(),
  type: z.string(),
})

// We could have a secret here, but you need to be logged into Sanity for preview to work anyways
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const validated = validator.safeParse(paramsToObject(searchParams))
  if (!validated.success) {
    return new Response("Invalid request", { status: 400 })
  }

  const { slug, type } = validated.data

  draftMode().enable()

  const path = resolvePath(type, slug)
  return new Response(null, {
    status: 307,
    headers: {
      Location: path,
    },
  })
}
