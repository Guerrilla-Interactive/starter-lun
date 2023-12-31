import { defineField } from "sanity"

import { LINKABLE_DOC_TYPES } from "../sanity.consts"

export const internalLink = defineField({
  name: "internalLink",
  title: "Velg dokument",
  type: "reference",
  to: LINKABLE_DOC_TYPES.map((type) => {
    return { type }
  }),
})
