import { draftMode } from "next/headers"
import Link from "next/link"

export const PreviewIndicator = () => {
  const { isEnabled } = draftMode()

  if (!isEnabled) return null
  return (
    <div className="bg-dark fixed bottom-3 right-3 z-20 flex gap-4 rounded px-4 py-2 pr-2 text-sm text-white">
      <div className="flex items-center gap-2 font-bold">
        Forhåndsvisning aktivert
      </div>
      <Link
        className="rounded border border-white px-2.5 py-1.5 transition-colors hover:bg-white/20"
        href="/api/exit-preview"
      >
        Avslutt
      </Link>
    </div>
  )
}
