import { cn } from "./cn.util"

export const hyphenate = (string: string, minLength: number) => {
  if (!string) return ""

  const words = string.split(" ")

  const longWords = words.filter(
    (word) =>
      word.length >= minLength && !word.includes("-") && !word.includes("–")
  )

  const hyphenated = words.map((word, i) => {
    if (longWords?.includes(word)) {
      return (
        <span
          key={`${word}_${i}`}
          className={cn("hyphens-none xs:hyphens-auto")}
        >
          {word}{" "}
        </span>
      )
    } else return `${word} `
  })

  return hyphenated
}
