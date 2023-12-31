"use client"
import { Dialog, Transition } from "@headlessui/react"
import { usePathname } from "next/navigation"
import { Fragment, useCallback, useEffect, useState } from "react"
import { MenuItem } from "./menu-item.component"
import { MenuToggle } from "./menu-toggle.component"
import { MainMenu } from "@/lib/queries/settings/settings.query"
import { useGlobalContext } from "@/src/app/context/global-context"

export const CollapsedMenu = ({ mainMenu }: { mainMenu: MainMenu }) => {
  const { globalData, setGlobalData } = useGlobalContext()
  const isExpanded = globalData.headerData.expanded

  const handleToggle = () => {
    setGlobalData({
      ...globalData,
      headerData: {
        ...globalData.headerData,
        expanded: !globalData.headerData.expanded,
      },
    })
  }

  return (
    <>
      <MenuToggle
        className="md:hidden"
        isOpen={isExpanded}
        setIsOpen={handleToggle}
      />
      <Transition appear show={isExpanded} as={Fragment}>
        <Dialog
          static
          open={isExpanded}
          onClose={handleToggle}
          className="menu:hidden dark-olive fixed inset-0 z-40"
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>

          <div className="fixed inset-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed right-0 flex h-full w-full pt-32 sm:pt-20">
                <div className="h-full w-full bg-lunnheim-darker-olive bg-opacity-[90%] backdrop-blur-xl" />
                <div className="relative z-20 grow">
                  <div className="h-full overflow-y-auto">
                    <Dialog.Panel
                      as="ul"
                      className="flex flex-col pb-10 pt-3 font-sans text-3xl text-lunnheim-pale-yellow sm:text-xl md:text-2xl"
                    >
                      {mainMenu?.map((item) => {
                        if (!("linkType" in item)) return null
                        return <MenuItem key={item._key} item={item} />
                      })}
                    </Dialog.Panel>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
