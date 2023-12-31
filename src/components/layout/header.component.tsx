"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useCallback, useEffect, useRef, useState } from "react"

import type { MenuSettings } from "@/lib/queries/settings/settings.query"
import { LunnheimLogo } from "@/sanity/desk/theme/lunnheim-logo.component"
import { LunnheimSymbol } from "@/sanity/desk/theme/lunnheim-symbol.component"
import { useGlobalContext } from "@/src/app/context/global-context"
import ElementsForm from "@/src/app/stripe/components/ElementsForm"
import { cn } from "@/src/utils/cn.util"
import useOutsideClick from "@/src/utils/hooks/use-outside-click.hook"

import {
  Absolute,
  Flex,
  FlexCol,
  FlexRow,
  Relative,
  Section,
} from "../nextgen-core-ui"
import ShoppingCart from "../shopping-cart/shopping-cart.component"
import { LinkResolver } from "../utils/link-resolver.component"
import { MenuToggle } from "./menu/menu-toggle.component"

const HeaderContent = (props: MenuSettings) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const { globalData, setGlobalData } = useGlobalContext()

  useOutsideClick(headerRef, () => {
    setGlobalData((prevData) => ({
      ...prevData,
      headerData: {
        ...prevData.headerData,
        expanded: false,
      },
    }))
  })

  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = useState<string | null>(null)

  const toggleMenu = () => {
    setGlobalData((prevData) => ({
      ...prevData,
      headerData: {
        ...prevData.headerData,
        expanded: !prevData.headerData.expanded,
      },
    }))
  }

  const closeMenu = useCallback(() => {
    setGlobalData((prevData) => ({
      ...prevData,
      headerData: {
        ...prevData.headerData,
        expanded: false,
      },
    }))
  }, [setGlobalData])

  useEffect(() => {
    if (pathname !== prevPathname) {
      closeMenu()
      setPrevPathname(pathname)
    }
  }, [closeMenu, pathname, prevPathname])

  const headerClass = cn(
    "!fixed !top-0 z-50 mt-6 w-full overflow-hidden scrollbar-hide transition-all duration-500  ease-out",
    globalData.headerData.expanded && ""
  )

  let displayOrderSuccessDialog = false
  const orderedDate = globalData.orderSnapshot?.client.date
  // This is the time (in seconds) after the making an order that we dispaly order success message 
  const secondsAfterOrderToDisplayOrderSuccessDialog = 60 * 24 * 3 // 3 days
  try {
    if (orderedDate) {
      const currentDate = new Date()
      // Note *1000 is convert to seconds milliseconds
      const timeUntilSuccessDialogIsShown = new Date(
        orderedDate.getTime() +
        secondsAfterOrderToDisplayOrderSuccessDialog * 1000)
      displayOrderSuccessDialog = timeUntilSuccessDialogIsShown.getTime() >= currentDate.getTime()
    }
  } catch (e) {
    console.log('amazing', e, orderedDate, typeof orderedDate)
  }

  return (
    <Section className={headerClass}>
      <FlexCol
        ref={headerRef}
        className="relative mx-auto h-full w-full max-w-[97.5vw] overflow-hidden  scrollbar-hide  rounded-xl bg-lunnheim-ivory-yellow bg-opacity-80 backdrop-blur-xl md:max-w-[1360px]"
      >
        <Flex className="mx-4 content-center justify-between overflow-hidden py-3 md:gap-x-12 md:px-10">
          <MenuToggle
            isOpen={globalData.headerData.expanded}
            setIsOpen={toggleMenu}
          />
          <FlexCol className="">
            <Link href="/" className="relative max-h-[25px]" aria-label="Go to homepage">
              <div className="h-[280px] w-full transition-all duration-500">
                <div className="flex flex-col">
                  <div
                    className={cn(
                      globalData.headerData.topOfPage
                        ? "mt-[-75px]"
                        : "mt-[-4px]",
                      "mx-auto flex flex-col items-center gap-10 transition-all duration-500"
                    )}
                  >
                    <div className="ml-[-10px]">
                      <LunnheimSymbol
                        fill={"LUNNHEIM_DARK_OLIVE"}
                        width="130"
                      />
                    </div>
                    <LunnheimLogo fill="LUNNHEIM_DARK_OLIVE" />
                  </div>
                </div>
              </div>
            </Link>
          </FlexCol>
          <MenuToggle
            className=""
            isCart
            isOpen={globalData.headerData.expanded}
            setIsOpen={toggleMenu}
          />
        </Flex>
        <Relative
          className={cn(
            "transition-all duration-500 overflow-y-auto overflow-x-hidden",
            globalData.headerData.expanded
              ? " h-[70vh] opacity-100"
              : "pointer-events-none h-0 opacity-0"
          )}
        >
          <Absolute
            className={cn(
              globalData.headerData.expanded ? "top-0" : "",
              "h-full min-h-[70vh] w-full justify-between bg-lunnheim-olive bg-opacity-10 transition-all md:min-h-[calc(20rem)]"
            )}
          >
            <FlexCol className="h-full px-2 pb-2">
              <FlexCol className="h-full rounded-2xl">
                <FlexRow
                  className={cn(
                    "h-full justify-between gap-x-4 rounded-2xl p-2 opacity-100 transition-all ease-out"
                  )}
                >
                  <FlexCol
                    ref={dropdownRef}
                    className={cn(
                      "h-fit w-full gap-y-4 py-6 transition-all duration-500 opacity-100 ease-out md:w-1/4",
                      globalData.shoppingCartData.checkoutActive && "!w-0 h-0 opacity-0"
                    )}
                  >
                    {props.menu?.map((item) => {
                      if (!("linkType" in item)) return null
                      return (
                        <LinkResolver
                          {...item}
                          link={{
                            _type: "internalLink",
                            slug:
                              item.linkType === "internal"
                                ? item.link?.slug
                                : undefined,
                            title:
                              item.linkType === "internal"
                                ? item.link?.title
                                : undefined,
                          }}
                          key={item._key}
                          linkType="internal"
                          className={cn("")}
                        >
                          <FlexRow className="cursor-pointer rounded-xl bg-lunnheim-dark-olive bg-opacity-0 px-8 py-1 transition-all duration-200 hover:bg-opacity-10 active:bg-opacity-20">
                            <div>
                              {item.linkType === "internal"
                                ? item.link?.title
                                : undefined}
                            </div>
                          </FlexRow>
                        </LinkResolver>
                      )
                    })}
                  </FlexCol>
                  <FlexCol className={cn("w-full rounded-2xl  bg-slate-100 bg-opacity-10  transition-all duration-500", globalData.shoppingCartData.checkoutActive && "w-0")}>
                    {displayOrderSuccessDialog && !globalData.shoppingCartData.checkoutActive && (
                      <OrderSuccessDialog />
                    )}
                  </FlexCol>
                  <ShoppingCart />

















                  {/* CHECKOUT PART */}




                  <FlexCol className={cn("w-0 rounded-2xl opacity-0 duration-1000 bg-opacity-10 ", globalData.shoppingCartData.checkoutActive && "w-full opacity-100")}>
                    <FlexRow className={cn("w-0 rounded-2xl opacity-0  bg-opacity-10 ", globalData.shoppingCartData.checkoutActive && "w-full opacity-100")}>
                      {globalData.shoppingCartData.checkoutActive &&

                        <FlexCol className={cn("relative justify-start md:px-12 flex w-0 mt-12 opacity-0 transition-all duration-1000", globalData.shoppingCartData.checkoutActive && "!opacity-100 w-full")}>
                          <ElementsForm />

                        </FlexCol>


                      }
                    </FlexRow>

                  </FlexCol>
















                </FlexRow>
              </FlexCol>
            </FlexCol>
          </Absolute>
        </Relative >
      </FlexCol >
    </Section >
  )
}

const OrderSuccessDialog = () => {
  const { globalData } = useGlobalContext()
  const order = globalData.orderSnapshot
  const items = order?.items.map(x => x.name).join(", ")
  return (
    <div className="px-8 xl:px-32 md:py-16">
      <div>
        Hi {order?.client.firstName},
        <p className="mt-4">Thank you for your recent purchase of {items}. We have received your payment of {order?.client.price}. Further details will be sent to your email.</p>
        <p className="mt-2">Your order was made on. {order?.client?.date?.toLocaleDateString()}.</p>
      </div>

    </div>
  )
}


export const Header = (props: MenuSettings) => {
  return (
    <header>
      <HeaderContent {...props} />
    </header>
  )
}
