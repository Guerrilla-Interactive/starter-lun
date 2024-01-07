import { Header } from "@/components/layout/header.component"
import { getSiteSettings } from "@/lib/queries/settings/settings.query"

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
    </>
  )
}

export default SiteLayout
