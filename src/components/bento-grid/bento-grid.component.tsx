import React from "react"
import { Icon, IconType } from "../icons/icons.component"
import { FlexCol } from "../nextgen-core-ui"

interface BentoGridProps {
  activeCategory: string | null
  items: Array<{
    id: number
    piece: {
      number: number
      name: string
      description: string
    }
    iconType?: IconType
    categories: string[]
    priority?: number
    className?: string
    price: number
    images: string[]
  }>
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  activeCategory,
  items,
}) => {
  const filteredItems = items?.filter(
    (item) =>
      activeCategory === "All Pieces" ||
      (activeCategory && item?.categories.includes(activeCategory))
  )

  const getStyles = (bgClassName: string) => {
    switch (bgClassName) {
      case "bg-lunnheim-olive":
      case "bg-lunnheim-dark-olive":
      case "bg-lunnheim-darker-olive":
        return {
          textColor: "text-lunnheim-ivory-yellow",
          iconColor: "LUNNHEIM_IVORY_YELLOW" as const,
        }
      case "bg-lunnheim-pale-yellow":
      case "bg-lunnheim-ivory-yellow":
      case "bg-lunnheim-vibrant-yellow":
      case "bg-lunnheim-dusty-pink":
      case "bg-lunnheim-light-pink":
        return {
          textColor: "text-lunnheim-dark-olive",
          iconColor: "LUNNHEIM_DARK_OLIVE",
        }
      default:
        return { textColor: "text-lunnheim-black", iconColor: "LUNNHEIM_BLACK" }
    }
  }

  const getItemStyle = (item: (typeof items)[0]) => {
    const styleMap: {
      [key: string]: { gridRowEnd: string; gridColumnEnd: string }
    } = {
      "1": { gridRowEnd: "span 2", gridColumnEnd: "span 4" },
      "2": { gridRowEnd: "span 1", gridColumnEnd: "span 4" },
      "3": { gridRowEnd: "span 3", gridColumnEnd: "span 4" },
      "4": { gridRowEnd: "span 2", gridColumnEnd: "span 2" },
      "5": { gridRowEnd: "span 2", gridColumnEnd: "span 2" },
    }
    return styleMap[(item.priority || 5).toString()]
  }

  const renderGridItems = () => {
    return filteredItems.map((item) => {
      const { textColor, iconColor } = getStyles(item.className || "")
      return (
        <div
          key={item.id}
          className={`rounded-3xl border-2 border-slate-400/10 ${item.className}  flex flex-col p-7`}
          style={getItemStyle(item)}
        >
          <FlexCol className={` justify-end gap-y-2   ${textColor}`}>
            <h3 className="text-lg  font-bold">{item.piece.name}</h3>
            <p className="text-sm">{item.piece.description}</p>
            <div className="mt-4 flex justify-between ">
              <span className="text-lg font-semibold">
                ${item.price.toFixed(2)}
              </span>
              <span className="opacity-10">
                <Icon
                  type={item.iconType ?? "bento"}
                  color={(iconColor as any) ?? "LUNNHEIM_BLACK"}
                  size={80}
                />
              </span>
            </div>
          </FlexCol>
        </div>
      )
    })
  }

  return (
    <div className="py-8 md:px-0">
      <div
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(150px, 3fr))" }}
        className="mb-8 grid auto-rows-[192px] gap-4"
      >
        {renderGridItems()}
      </div>
    </div>
  )
}
