import React, { useState } from "react"

import { FlexCol, FlexRow, GapX } from "@/src/components/nextgen-core-ui"

interface MaterialFilterTabProps {
  label: string
  isActive: boolean
  onClick: () => void
}

const MaterialFilterTab: React.FC<MaterialFilterTabProps> = ({
  label,
  isActive,
  onClick,
}) => (
  <FlexCol
    data-dx="material-tab"
    className={`cursor-pointer rounded px-2 py-1 text-xxs tracking-wide ${
      isActive
        ? "bg-lunnheim-dark-olive text-lunnheim-ivory-yellow "
        : "bg-lunnheim-pale-yellow text-lunnheim-darker-olive opacity-60"
    }`}
    onClick={onClick}
  >
    <FlexRow className="my-auto">{label}</FlexRow>
  </FlexCol>
)

interface MaterialFilterTabsProps {
  materials: (string | null | undefined)[]
  onTabChange: (label: string) => void
}

const MaterialFilterTabs: React.FC<MaterialFilterTabsProps> = ({
  materials,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = useState("All")

  const handleTabClick = (label: string) => {
    setActiveTab(label)
    onTabChange(label)
  }

  return (
    <FlexRow>
      <GapX gap-x-2>
        {/* All button */}
        <MaterialFilterTab
          label="All"
          isActive={activeTab === "All"}
          onClick={() => handleTabClick("All")}
        />

        {/* Other material buttons */}
        {materials.map((material) =>
          material ? (
            <MaterialFilterTab
              key={material}
              label={material}
              isActive={activeTab === material}
              onClick={() => handleTabClick(material)}
            />
          ) : null
        )}
      </GapX>
    </FlexRow>
  )
}

export default MaterialFilterTabs
