import { q } from "groqd"
import { slugQuery } from "../utils/slug.query"

export const privacyQuery = q("*")
  .filterByType("privacySettings")
  .grab({
    privayPolicyPage: q("privayPolicyPage")
      .deref()
      .grab$({
        _id: q.string(),
        title: q.string().optional(),
        ...slugQuery,
      })
      .nullable(),
  })
  .nullable()
