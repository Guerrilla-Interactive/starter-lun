"use client"

import { Menu, Transition } from "@headlessui/react"
import { CaretDown } from "@phosphor-icons/react"
import { Fragment } from "react"

import { LinkResolver } from "@/components/utils/link-resolver.component"
import type { LinkGroupProps, LinkPropsWithGroup } from "@/sanity/queries/navigation/links.query"
import { cn } from "@/utils/cn.util"

export const MenuItem = ({ item }: { item: LinkPropsWithGroup }) => {
  const { linkType } = item

  if (linkType === "unknown") return null

  if (linkType === "linkGroup" && (!item.items || item.items?.length < 1))
    return null

  return (
    <li
      className={cn(
        linkType === "linkGroup" && "relative ",
        "  border-b-[1px] border-lunnheim-olive border-opacity-30  last-of-type:border-b-0"
      )}
    >
      {linkType === "linkGroup" ? (
        <LinkGroup {...item} />
      ) : (
        <LinkResolver
          {...item}
          className={cn(
            "menu:py-0 flex  whitespace-nowrap  border-lunnheim-olive border-opacity-30 py-4 !font-sans  text-xl font-medium tracking-wide   transition-opacity hover:opacity-50 sm:py-4 "
          )}
        >
          {item.link?.title}
        </LinkResolver>
      )}
    </li>
  )
}

const LinkGroup = ({ title, items }: LinkGroupProps) => {
  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button
            className={cn(
              "menu:py-0 flex w-full items-center justify-between gap-[0.2em] whitespace-nowrap py-2.5 text-left font-medium transition-opacity hover:opacity-80 sm:py-4"
            )}
          >
            {title}
            <CaretDown
              weight="bold"
              className={cn(
                "shrink-0 transition-transform",
                open && "rotate-180"
              )}
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              className={cn(
                "menu:absolute menu:-right-3 menu:top-full menu:w-80 menu:translate-y-3 menu:divide-y-0 menu:rounded-3xl menu:border-0 menu:bg-pink menu:p-6 menu:shadow mt-4 flex flex-col divide-y border-t pb-4 md:pb-5 "
              )}
            >
              {items?.map((item) => {
                if (!("linkType" in item)) return null

                return (
                  <Menu.Item key={item._key}>
                    {({ active, close }) => (
                      <LinkResolver
                        {...item}
                        onClick={close}
                        className={cn(
                          "menu:px-3 menu:py-1.5 menu:hover:bg-dark/5 menu:hover:opacity-100 flex rounded py-2.5 font-medium transition hover:opacity-50 focus:outline-2 sm:py-4 ",
                          active && "outline"
                        )}
                        linkStyle=" !text-lunnheim-pale-yellow "
                      >
                        {item.link?.title}
                      </LinkResolver>
                    )}
                  </Menu.Item>
                )
              })}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}
