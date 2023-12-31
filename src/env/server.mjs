// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { clientEnv as clientEnv, formatErrors } from "./client.mjs"
import { serverEnvRaw, serverSchema } from "./schema.mjs"

const _serverEnv = serverSchema.safeParse(serverEnvRaw)

if (!_serverEnv.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(_serverEnv.error.format())
  )
  throw new Error("Invalid environment variables")
}

for (let key of Object.keys(_serverEnv.data)) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    console.warn("❌ You are exposing a server-side env-variable:", key)

    throw new Error("You are exposing a server-side env-variable")
  }
}

// Note that here we are not exporting client env to avoid accidentally using serverEnv
// for when clientEnv should have been used instead
export const serverEnv = { ..._serverEnv.data }
