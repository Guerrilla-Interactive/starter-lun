"use client"

import React, { useCallback,useEffect, useMemo, useRef } from "react"
import { useDraggable } from "react-use-draggable-scroll"

import type { PieceQuery, PieceType } from "@/src/app/(site)/pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries"
import { useGlobalContext } from "@/src/context/global-context"

import type { IconType } from "../icons/icons.component"
import { H3 } from "../layout/heading.component"
import { Flex } from "../nextgen-core-ui"

export interface CateogrySliderCategory {
  name: string
  pieceType?: PieceType
  icon?: IconType
  size?: number

}

interface CategoryFilterSliderProps {
  categories: Array<PieceType>
  pieces: PieceQuery[],
  activeCategory: PieceType,
  setActiveCategory: (newCategory: PieceType) => void
  className?: string
  style?: React.CSSProperties
}

export const AllCategoryPieceType = {
  slug: 'all',
  title: 'All',
  activeInSlider: true
}

export const CategoryFilterSlider: React.FC<CategoryFilterSliderProps> = ({ categories,
  activeCategory,
  pieces,
  setActiveCategory,
  className,
  style,
}) => {

  const { globalData, setGlobalData } = useGlobalContext()
  const ref = useRef<HTMLDivElement>(null)
  const { events } = useDraggable(ref as any, {})
  const categoriesWithAllCategories = [AllCategoryPieceType, ...categories]


  // Function to count pieces in each category
  const countPiecesInCategory = (categoryPieceType: PieceType) => {
    // Null cateogries means "All categories" 
    if (categoryPieceType?.slug === AllCategoryPieceType.slug) {
      return pieces.length
    }
    return pieces?.filter(piece => piece.pieceType?.slug === categoryPieceType?.slug).length || 0
  };


  const sliderData = useMemo(() => {
    const amountOfItems = categories.length
    const itemsInView = categories.filter(
      (_category, index) =>
        index < Math.floor(globalData.screenData.screenWidth / 250)
    ).length
    const allItemsInView = itemsInView >= amountOfItems

    return { itemsInView, amountOfItems, allItemsInView }
  }, [categories, globalData.screenData.screenWidth])

  useEffect(() => {
    if (
      globalData.pageData?.componentsData &&
      JSON.stringify(globalData.pageData.componentsData.draggableSliderData) !==
      JSON.stringify(sliderData)
    ) {
      setGlobalData((prevData) => ({
        ...prevData,
        pageData: {
          ...prevData.pageData,
          componentsData: {
            ...prevData.pageData.componentsData,
            draggableSliderData: sliderData,
          },
        },
      }))
    }
  }, [sliderData, setGlobalData, globalData.pageData?.componentsData])

  const handleCategoryClick = useCallback(
    (pieceType: PieceType) => {
      setActiveCategory(pieceType)
    },
    [setActiveCategory]
  )

  return (
    <Flex
      style={style}
      className={`animate-fadeIn cursor-grab flex-nowrap space-x-12 overflow-x-scroll scrollbar-hide md:space-x-28 ${className}`}
      {...events}
      ref={ref}
    >
      {categoriesWithAllCategories.filter(x => x?.activeInSlider).map((pieceType, index) => (
        <button
          key={index}
          className={`flex  min-w-fit cursor-pointer items-center justify-center  rounded-lg border-gray-300 text-left font-serif transition-all duration-300 first:pl-0 active:scale-95 ${!sliderData.allItemsInView && "last:pr-28"
            }
                    ${activeCategory?.slug === pieceType?.slug
              ? "opacity-100"
              : "opacity-40"
            } 
                    hover:opacity-100`}
          onClick={() => handleCategoryClick(pieceType as any)}
        >
          {/* {icon && <Icon size={size || 20} type={icon} />} */}
          <H3 size={4}>
            {pieceType?.title}
          </H3>
          <span className="ml-1 mt-[-0.8rem] text-[0.8rem]">{countPiecesInCategory(pieceType || null)}</span>
        </button>
      ))}
    </Flex>
  )
}
