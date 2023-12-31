import { defineField } from "sanity"
interface ISlugField {
  name?: string
  title?: string
  group?: string
  source?: string
}

/* Put all reserved root slugs here, i.e. folder names under web/pages */
const RESERVED_ROOT_SLUGS = ["designmanual"]

export const slugField = ({
  name = "slug",
  title = "Slug",
  group,
  source = "title",
}: ISlugField) => {
  return defineField({
    name,
    title: title,
    type: "slug",
    validation: (Rule) => [
      Rule.required().error("Slug is required"),
      Rule.custom((slug, context) => {
        if (!slug?.current || typeof slug?.current === "undefined") {
          return true
        }
        if (slug.current.split("").some((c) => !legalCharacters.includes(c))) {
          return "The slug contains illegal characters. Allowed characters are a-z, 0-9 and hyphen (-)"
        }
        if (
          context?.document?._type === "page" &&
          RESERVED_ROOT_SLUGS.includes(slug.current)
        ) {
          return "This slug is reserved and cannot be used"
        }
        return true
      }).error(),
    ],
    options: {
      source,
      maxLength: 96,
    },
    group,
  })
}

export const legalCharacters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "d",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "-",
  "æ",
  "ø",
  "å",
]
