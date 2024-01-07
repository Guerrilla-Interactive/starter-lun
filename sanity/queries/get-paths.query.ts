import { tClient } from "@/sanity/groqd-client"
import { q } from "groqd"

const query = q("*")
  .filter("_type == $type && defined(slug)")
  .grab({
    params: q("").grab({
      slug: ["slug.current", q.string()],
    }),
  })

export const getPaths = async (type: string) => {
  return await tClient(query, { type })
}
