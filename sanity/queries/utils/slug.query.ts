import type { Selection } from "groqd"
import { q } from "groqd"

export const slugQuery = {
  slug: ["slug.current", q.string().optional()],
} satisfies Selection
