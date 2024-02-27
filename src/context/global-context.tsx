"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';


export interface GlobalContext {
  pathname: string | null;
  layout?: {
    header: {
      menu: {
        isExpanded?: boolean;
        itemActive?: string;
        headerMenuItems?: {
          label: string;
          path: string;
        }[];
      }
      footer: {
        isExpanded?: boolean;
        itemActive?: string;
        footerMenuItems?: any[];
      }
    }
  }
}


const initialGlobalContext: GlobalContext = {
  pathname: null,
};

const GlobalContextData = createContext<GlobalContext>(initialGlobalContext);

export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  return (
    <GlobalContextData.Provider value={{ pathname }}>
      {children}
    </GlobalContextData.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContextData);
