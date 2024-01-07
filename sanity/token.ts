// ./sanity/lib/token.ts
import 'server-only'

import { experimental_taintUniqueValue } from 'react'
import { serverEnv } from '@/src/env/server.mjs'

export const sanityAPIToken = serverEnv.SANITY_API_READ_TOKEN

if (!sanityAPIToken) {
  throw new Error('Missing SANITY_API_READ_TOKEN')
}

experimental_taintUniqueValue(
  'Do not pass the sanity API read token to the client.',
  process,
  sanityAPIToken,
)
