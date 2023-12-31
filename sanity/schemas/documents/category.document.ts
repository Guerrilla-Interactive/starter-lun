import { defineType } from "sanity";
import { defaultGroups } from "../utils/default-groups.util";
import { CirclesThreePlus } from "@phosphor-icons/react";
import { requiredField } from "../generator-field/required.field";
import { slugField } from "../generator-field/slug.field";
import { metaFields } from "../generator-field/meta-fields.field";
import { booleanField } from "../generator-field/boolean.field";

export const category = defineType({
  type: "document",
  name: "category",
  title: "Category",
  icon: CirclesThreePlus,
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
    booleanField({
      name: "activeInSlider",
      initialValue: false
    }),
    slugField({}),
    ...metaFields({}),
  ]
}) 
