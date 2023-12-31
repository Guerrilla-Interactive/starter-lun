import { SettingsView, useSecrets } from "@sanity/studio-secrets"
import { useEffect, useState } from "react"

const namespace = "fathom"

const pluginConfigKeys = [
  {
    key: "fathomPassword",
    title: "Fathom password (if any)",
  },
]

export interface ISecrets {
  fathomPassword: string
}

export const Secret = () => {
  const { secrets } = useSecrets(namespace)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    if (!secrets) {
      setShowSettings(true)
    }
  }, [secrets])

  if (!showSettings) {
    return null
  }
  return (
    <SettingsView
      title={"Fathom password"}
      namespace={namespace}
      keys={pluginConfigKeys}
      onClose={() => {
        setShowSettings(false)
      }}
    />
  )
}
