import type { URLSearchParams } from "url"

export const paramsToObject = (entries: URLSearchParams) => {
  const result: { [key: string]: any } = {}
  for (const [key, value] of entries) {
    // each 'entry' is a [key, value] tuple
    result[key] = value
  }
  return result
}
