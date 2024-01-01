// ./sanity/lib/token.ts

import 'server-only'

import { experimental_taintUniqueValue } from 'react'

export const sanityAPIToken = process.env.SANITY_API_TOKEN

if (!sanityAPIToken) {
  throw new Error('Missing SANITY_API_READ_TOKEN')
}

experimental_taintUniqueValue(
  'Do not pass the sanity API read token to the client.',
  process,
  sanityAPIToken,
)