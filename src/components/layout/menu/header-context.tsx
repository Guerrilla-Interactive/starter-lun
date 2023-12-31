import {
  createContext,
  useContext,
  useState,
  ReactNode,
  SetStateAction,
} from "react"

// Context Definition
interface MenuOpenContextProps {
  menuContextStatus: boolean
  menuContextToggle: () => void // Simplified the signature for direct toggle
}

const MenuOpenContext = createContext<MenuOpenContextProps | undefined>(
  undefined
)

export const useMenuOpen = (): MenuOpenContextProps => {
  const context = useContext(MenuOpenContext)
  if (!context) {
    throw new Error("useMenuOpen must be used within a MenuOpenProvider")
  }
  return context
}

interface MenuOpenProviderProps {
  children: ReactNode
}

export const MenuOpenProvider: React.FC<MenuOpenProviderProps> = ({
  children,
}) => {
  const [menuContextStatus, setMenuContextStatus] = useState(false)

  const menuContextToggle = () => {
    console.log("Toggling menuContextStatus from", menuContextStatus)
    setMenuContextStatus((prevState) => {
      const newValue = !prevState
      console.log("menuContextStatus changed to", newValue)
      return newValue
    })
  }

  return (
    <MenuOpenContext.Provider value={{ menuContextStatus, menuContextToggle }}>
      {children}
    </MenuOpenContext.Provider>
  )
}
