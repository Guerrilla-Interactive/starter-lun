import { defineField, defineType } from "sanity"

export const metaFields = ({
  title = "SEO & metadata",
  group = "meta",
  includeTags = true,
}: {
  includeTags?: boolean
  group?: string | null
  title?: string
}) => {
  const seo = defineField({
    name: "metadata",
    title,
    type: "object",
    ...(group && { group }),
    fields: [
      {
        name: "title",
        title: "Title for search engines",
        type: "string",
        validation: (Rule) =>
          Rule.max(50).warning(
            "The title exceeds 50 characters and may me truncated (...)"
          ),
      },
      {
        name: "desc",
        title: "Description for search engines",
        type: "text",
        rows: 3,
        validation: (Rule) =>
          Rule.max(150).warning(
            "The description exceeds 150 characters and may me truncated (...)"
          ),
      },
      {
        name: "graphic",
        title: "Image for sharing in social media",
        type: "image",
        description: "Recommended size: 1200x630 (PNG or JPG)",
        fields: [
          {
            name: "alt",
            title: "Alt text",
            type: "string",
            options: {
              isHighlighted: true,
            },
          },
        ],
      },
    ],
  })

  const metatags = defineField({
    name: "metatags",
    title: "Metatags",
    description: "Keywords related to this document",
    type: "array",
    of: [{ type: "string" }],
    ...(group && { group }),
    options: {
      layout: "tags",
    },
  })

  if (includeTags) {
    return [metatags, seo]
  }

  return [seo]
}
