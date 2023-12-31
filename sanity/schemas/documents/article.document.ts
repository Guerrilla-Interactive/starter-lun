import { ArticleMedium } from "@phosphor-icons/react"
import { defineType } from "sanity"

import { portableField } from "@/sanity/schemas/generator-field/portable.field"
import { requiredField } from "@/sanity/schemas/generator-field/required.field"
import { sectionsField } from "@/sanity/schemas/generator-field/sections.field"
import { slugField } from "@/sanity/schemas/generator-field/slug.field"
import { defaultGroups } from "@/sanity/schemas/utils/default-groups.util"

export const article = defineType({
  type: "document",
  name: "article",
  title: "Article",
  icon: ArticleMedium,
  groups: defaultGroups,
  options: {
    previewable: true,
    linkable: true,
  },
  fields: [
    requiredField({
      type: "string",
      name: "title",
    }),
    slugField({}),
    sectionsField({}),
    portableField({}),
  ],
})
