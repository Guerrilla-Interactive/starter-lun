export const upperFirst = (string: string) => {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : ""
}

export const kebabToCamel = (string: string) => {
  return string?.replace(/-./g, (x: string) => (x[1] ? x[1].toUpperCase() : x))
}

export const kebabToPascal = (string: string) => {
  return (
    kebabToCamel(string).charAt(0).toUpperCase() + kebabToCamel(string).slice(1)
  )
}

export const cleanString = (string: string) => {
  if (!string) return

  const charsToReplace = { æ: "ae", ø: "o", å: "aa", " ": "-" }
  return string
    .toLowerCase()
    .replace(
      /[æøå\s+]/g,
      (m) => charsToReplace[m as keyof typeof charsToReplace]
    )
    .substring(0, 20)
}
