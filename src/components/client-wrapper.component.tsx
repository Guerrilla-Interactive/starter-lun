"use client"

import { useFathom } from "@/lib/fathom/use-fathom.hook"

export const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  useFathom()

  return <>{children}</>
}
