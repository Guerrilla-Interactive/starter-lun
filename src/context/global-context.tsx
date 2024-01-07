"use client"

import { usePathname } from "next/navigation"
import type {
  Dispatch,
  ReactNode,  SetStateAction} from "react";
import React, {
  createContext,
  useContext,
  useEffect,
  useState} from "react"
import * as z from "zod"

import type { OrderEmailProps } from "@/src/emails/order-success";
import { useLocalStorage } from "@/src/utils/hooks/use-local-storage";

import type { PieceQuery, PieceType } from "../app/(site)/pieces/pieces-shared-utils/pieces-queries/pieces.shared-queries";
import useScrollbarWidth from "./context-hooks/calculate-scrollbar-width.utility"


type MenuItemType = {
  _key: string
  title: string
  slug?: {
    current?: string
  }
  linkType: "linkGroup" | "single" | "unknown"
  items?: MenuItemType[]
  isActive?: boolean
}

type ComponentsDataType = {
  draggableSliderData?: {
    items?: {
      title?: string
      inView?: boolean
    }[]
    itemsInView?: number
    amountOfItems?: number
    allItemsInView?: boolean
    componentWidth?: number
  },
  pieceGridData?: {
    activeCategory?: PieceType | "All Pieces" | string | null;
    pieces?: PieceQuery[];
  },
}

// Note that we're created a zod schema because we would need to validate   
// this data as we send it over nextjs actions to send email to client 
export const ShoppingCartItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  variant: z.string(),
  price: z.number().gt(0),
  quantity: z.number().min(1),
  imageUrl: z.string().optional(),
  sizeNote: z.string().optional()
})

export type ShoppingCartItem = z.infer<typeof ShoppingCartItemSchema>

interface ShoppingCartData {
  items: ShoppingCartItem[]
  totalItems: number
  totalPrice: number
  checkoutActive?: boolean
}

interface HeaderDataType {
  headerColor: "dark-dark" | "dark-light" | "light-dark" | "light-light"
  headerHeight?: number
  expanded: boolean
  peek: boolean
  aboveTheFold: boolean
  topOfPage: boolean
  halfwayOrMore: boolean
  heroSectionHeight?: number
  activeRoute: string
  menuItems: MenuItemType[]
}

interface ScreenDataType {
  screenWidth: number
  screenHeight: number
  defaultContainerWidth?: number
  defaultContainerMarginX?: number
  scrollBarWidth: number
}

interface PageDataType {
  pathname: string | null
  componentsData?: ComponentsDataType
}

interface siteDataType {
  siteTitle?: string
  mode: "coming-soon" | "live" | "maintenance"
  currentUser?: {
    role: "visitor" | "admin"
  }
}





export interface GlobalData {
  headerData: HeaderDataType
  screenData: ScreenDataType
  pageData: PageDataType
  siteData: siteDataType
  shoppingCartData: ShoppingCartData
  verticalSpaceActivated: boolean
  orderSnapshot: null | OrderEmailProps
}

export interface ContextProps {
  globalData: GlobalData
  setGlobalData: Dispatch<SetStateAction<GlobalData>>
  addToCart: (item: ShoppingCartItem) => void
  activateVerticalSpace: () => void
  getCartItemsForPayment: () => any
  activateCheckout: () => void
  deactivateCheckout: () => void
}

const initialGlobalData: GlobalData = {
  headerData: {
    headerColor: "dark-dark",
    expanded: false,
    peek: false,
    heroSectionHeight: 0,
    topOfPage: true,
    aboveTheFold: true,
    halfwayOrMore: false,
    headerHeight: 0,
    activeRoute: "",
    menuItems: [],
  },

  siteData: {
    mode: "coming-soon",
    currentUser: {
      role: "visitor"
    },
  },

  shoppingCartData: {
    items: [],
    totalItems: 0,
    totalPrice: 0,
    checkoutActive: false,
  },

  screenData: {
    screenWidth: 0,
    screenHeight: 0,
    defaultContainerWidth: 0,
    defaultContainerMarginX: 0,
    scrollBarWidth: 0,
  },

  orderSnapshot: null,

  pageData: {
    pathname: "",
    componentsData: {
      draggableSliderData: {
        items: [
          {
            title: "",
            inView: false,
          },
        ],
        allItemsInView: false,
        amountOfItems: 0,
        itemsInView: 0,
        componentWidth: 0,
      },
      pieceGridData: {
        activeCategory: null,
        pieces: [],
      },

    },
  },
  verticalSpaceActivated: false,
}

const GlobalContext = createContext<ContextProps>({
  globalData: initialGlobalData,
  setGlobalData: () => undefined,
  addToCart: () => undefined,
  activateVerticalSpace: () => undefined,
  getCartItemsForPayment: () => undefined,
  activateCheckout: () => undefined,
  deactivateCheckout: () => undefined,
})

interface GlobalContextProviderProps {
  children: ReactNode
}

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const pathname = usePathname()
  const [globalData, setGlobalData] = useState<GlobalData>(initialGlobalData)
  const [cartCachedData, setCartItemsCached] = useLocalStorage<Array<ShoppingCartItem>>('cartItems', [])
  const [orderSnapshots] = useLocalStorage<Array<OrderEmailProps>>('cartSnapshots', [])
  // Note here that loaded is a boolean that tracks whether data from local storage is loaded
  // into the globalData context. We should only do this once, when the page first loads.
  const [loaded, setLoaded] = useState(false)

  // Here we load data from local storage into the global context
  // The data is the information in the cart and the list of order histories.
  useEffect(() => {
    if (!loaded) {
      const orderSnapshot = orderSnapshots.length > 0 ? orderSnapshots[orderSnapshots.length - 1]! : null
      if (orderSnapshot && orderSnapshot.client?.date) {
        // Here we try to parse the last ordered date. 
        // If that fails, we assume order was never placed
        try {
          orderSnapshot.client.date = new Date(orderSnapshot.client.date)
        } catch {
        }
      }
      setGlobalData(prev => ({
        ...prev,
        // Note that most recent order snapshot is at the end of the array
        orderSnapshot: orderSnapshot,
        shoppingCartData: {
          // Note that we are spreading the previous shopping cart data because getShoppingCartData 
          // doesn'return all fields 
          ...prev.shoppingCartData,
          ...getShoppingCartData(cartCachedData)
        }
      }))
    }
    setLoaded(true)
  }, [cartCachedData, loaded, orderSnapshots])

  function getShoppingCartData(items: Array<ShoppingCartItem>) {
    const totalItems = items.reduce((total, currentItem) => total + currentItem.quantity, 0);
    const totalPrice = items.reduce((total, currentItem) => total + currentItem.price * currentItem.quantity, 0);
    return {
      items,
      totalPrice,
      totalItems
    }
  }



  const addToCart = (item: ShoppingCartItem) => {

    setGlobalData((prevData) => {

      const updatedItems = [...prevData.shoppingCartData.items, item];

      setCartItemsCached(updatedItems)

      return {
        ...prevData,
        shoppingCartData: {
          ...prevData.shoppingCartData,
          ...getShoppingCartData(updatedItems)
        },
        headerData: {
          ...prevData.headerData,
          expanded: true, // Ensure the header is expanded when an item is added
        },
      };
    });
  };




  const activateCheckout = () => {
    setGlobalData((prevData) => ({
      ...prevData,
      shoppingCartData: {
        ...prevData.shoppingCartData,
        checkoutActive: true,
      },
    }));
  }





  const deactivateCheckout = () => {
    setGlobalData((prevData) => ({
      ...prevData,
      shoppingCartData: {
        ...prevData.shoppingCartData,
        checkoutActive: false,
      },
    }));
  }



  // set site mode to coming-soon, live or maintenance
  useEffect(() => {
    setGlobalData((prevData) => ({
      ...prevData,
      siteData: {
        ...prevData.siteData,
        mode: "coming-soon",
      },
    }))
  }, [])



  // set user role to visitor or admin
  useEffect(() => {
    setGlobalData((prevData) => ({
      ...prevData,
      siteData: {
        ...prevData.siteData,
        currentUser: {
          role: "visitor"
        },
      },
    }))
  }, [])








  useEffect(() => {
    setGlobalData((prevData) => ({
      ...prevData,
      headerData: {
        ...prevData.headerData,
        expanded: false,
      },
    }))
  }, [pathname])

  useEffect(() => {
    setGlobalData((prevData) => ({
      ...prevData,
      pageData: {
        pathname,
        componentsData: {
          draggableSliderData: {
            items: [
              {
                title: "",
                inView: false,
              },
            ],
            allItemsInView: false,
            amountOfItems: 0,
            itemsInView: 0,
          },
          pieceGridData: {
            activeCategory: "all",
          },
        },
      },
    }))
  }, [pathname])

  const scrollbarWidth = useScrollbarWidth()

  useEffect(() => {
    function updateDimensions() {
      const screenWidth = window.innerWidth
      const screenHeight = window.innerHeight
      setGlobalData((prevData) => ({
        ...prevData,
        screenData: {
          ...prevData.screenData,
          screenWidth,
          screenHeight,
        },
      }))
    }
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY
      const halfway = window.innerHeight / 2
      const aboveTheFold = scrollTop < window.innerHeight
      const topOfPage = scrollTop < 1
      const halfwayOrMore = scrollTop >= halfway

      setGlobalData((prevData) => ({
        ...prevData,
        headerData: {
          ...prevData.headerData,
          aboveTheFold,
          topOfPage,
          halfwayOrMore,
        },
      }))
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setGlobalData((prev) => ({
      ...prev,
      screenData: {
        ...prev.screenData,
        scrollBarWidth: scrollbarWidth,
      },
    }))
  }, [scrollbarWidth])

  const activateVerticalSpace = () => {
    setGlobalData((prevData) => ({
      ...prevData,
      verticalSpaceActivated: true,
    }))
  }

  useEffect(() => {
    // Function to check if the device is a desktop
    function isDesktop() {
      return window.innerWidth > 1024
    }

    // Function to reset the verticalSpaceActivated
    function resetVerticalSpace() {
      if (isDesktop()) {
        setGlobalData((prevData) => ({
          ...prevData,
          verticalSpaceActivated: false,
        }))
      }
    }

    // Adding event listeners for zoom in and out (detecting resize)
    window.addEventListener("resize", resetVerticalSpace)

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", resetVerticalSpace)
  }, [])


  const getCartItemsForPayment = () => {
    return globalData.shoppingCartData.items.map(item => ({
      name: item.name,
      variant: item.variant,
      amount: item.price,
      quantity: item.quantity,
    }));
  };

  return (
    <GlobalContext.Provider value={{
      globalData,
      setGlobalData,
      addToCart,
      activateVerticalSpace,
      activateCheckout,
      deactivateCheckout,
      getCartItemsForPayment,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
