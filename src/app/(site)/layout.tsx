import { Header } from "@/components/layout/header.component"
import { getSiteSettings } from "@/lib/queries/settings/settings.query"
import { useGlobalContext } from "../context/global-context"

interface RootLayoutProps {
  children: React.ReactNode
}

export const revalidate = 60

const SiteLayout = async ({ children }: RootLayoutProps) => {
  const settings = await getSiteSettings()


  const { menu } = settings
  return (
    <>
      {menu && <Header {...menu} />}

      <main className="">{children}</main>
      {/* <Footer {...footer} /> */}
    </>
  )
}

export default SiteLayout
