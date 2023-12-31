import { clientEnv } from "@/env/client.mjs"
import type { ISecrets } from "@/sanity/components/secret.component"
import { useSecrets } from "@sanity/studio-secrets"
import { useEffect, useState } from "react"

// https://app.usefathom.com/share/zzkpjxfb/wordpress?password=${passwordHash}

export const useIframeUrl = () => {
  const { secrets } = useSecrets<ISecrets>("fathom")
  const [error, setError] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const fathomId = clientEnv.NEXT_PUBLIC_FATHOM_ID

  useEffect(() => {
    setLoading(true)
    setError(null)

    if (!secrets) {
      return
    }

    if (!fathomId) {
      setError("Fathom ID not set")
      setLoading(false)
      return
    }

    const password = secrets?.fathomPassword

    if (secrets && !password) {
      setUrl(`https://app.usefathom.com/share/${fathomId}/wordpress`)
      setLoading(false)
      return
    }

    const hashPassword = async (password: string) => {
      const passwordHash = await sha256(password)
      setUrl(
        `https://app.usefathom.com/share/${fathomId}/wordpress?password=${passwordHash}`
      )
      setLoading(false)
    }
    hashPassword(password)
  }, [secrets, fathomId])

  return {
    url,
    loading,
    error,
  }
}

async function sha256(message: string) {
  // encode as UTF-8
  const msgBuffer = new TextEncoder().encode(message)

  // hash the message
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer)

  // convert ArrayBuffer to Array
  const hashArray = Array.from(new Uint8Array(hashBuffer))

  // convert bytes to hex string
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
  return hashHex
}
