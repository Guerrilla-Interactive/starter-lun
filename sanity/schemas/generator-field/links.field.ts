import { ArrowUpRight, Folder, Link } from "@phosphor-icons/react"
import type { ArrayDefinition, FieldDefinition, ObjectDefinition } from "sanity"
import { defineField } from "sanity"

import { externalLinkObjectField } from "./external-link-object.field"
import type { FieldDef } from "./field.types"
import { internalLinkObjectField } from "./internal-link-object.field"
import { stringField } from "./string.field"

type LinksField = FieldDef<Omit<ArrayDefinition, "of" | "validation">> & {
  includeLinkGroup?: boolean
  includeExternal?: boolean
  includeDownload?: boolean
  additionalFields?: FieldDefinition[]
  max?: number
  required?: boolean
}

const customTitleField = defineField({
  name: "customTitle",
  title: "Egendefinert tittel",
  type: "string",
})

const internalLink = (additionalFields?: LinksField["additionalFields"]) => {
  const fields: ObjectDefinition["fields"] = [
    ...internalLinkObjectField().fields,
    customTitleField,
    ...(additionalFields ? additionalFields : []),
  ]

  return defineField({
    ...internalLinkObjectField(),
    fields,
    preview: {
      select: {
        internalLinkTitle: "internalLink.title",
        internalLinkName: "internalLink.name",
        customTitle: "customTitle",
        linkToDomain: "linkToDomain",
        domainTitle: "domain.title",
      },
      prepare({
        internalLinkName,
        internalLinkTitle,
        customTitle,
        linkToDomain,
        domainTitle,
      }) {
        return {
          title: customTitle ?? internalLinkName ?? internalLinkTitle,
          subtitle: linkToDomain && domainTitle ? domainTitle : null,
          media: Link,
        }
      },
    },
  })
}

const externalLink = (additionalFields?: LinksField["additionalFields"]) => {
  const fields: ObjectDefinition["fields"] = [
    ...externalLinkObjectField().fields,
    customTitleField,
    ...(additionalFields ? additionalFields : []),
  ]

  return defineField({
    ...externalLinkObjectField(),
    fields,
    preview: {
      select: {
        url: "url",
        customTitle: "customTitle",
      },
      prepare({ url, customTitle }) {
        return {
          title: customTitle ?? url,
          media: ArrowUpRight,
        }
      },
    },
  })
}

const linkGroup = (additionalFields?: LinksField["additionalFields"]) => {
  const fields: ObjectDefinition["fields"] = [
    stringField({
      name: "title",
      title: "Tittel",
      required: true,
    }),
    linksField({
      name: "items",
      title: "Linker",
      includeExternal: true,
    }),
    ...(additionalFields ? additionalFields : []),
  ]

  return defineField({
    name: "linkGroup",
    title: "Link-gruppe",
    type: "object",
    icon: Folder,
    fields,
    preview: {
      select: {
        title: "title",
      },
      prepare({ title }) {
        return {
          title,
          media: Folder,
        }
      },
    },
  })
}

export const linksField = (props: LinksField) => {
  const { max, required = true } = props

  const linkTypes: ArrayDefinition["of"] = [
    internalLink(props.additionalFields),
  ]

  if (props?.includeExternal) {
    linkTypes.push(externalLink(props.additionalFields))
  }

  if (props?.includeLinkGroup) {
    linkTypes.push(linkGroup(props.additionalFields))
  }

  return defineField({
    ...props,
    type: "array",
    of: linkTypes,
    validation: (Rule) => {
      const rule = Rule

      if (required) {
        rule.required()
      }
      if (props.max) {
        return rule.min(1).max(max ?? 0)
      }

      return rule.min(1)
    },
    options: {
      ...props.options,
      required: props.required,
    },
  })
}
