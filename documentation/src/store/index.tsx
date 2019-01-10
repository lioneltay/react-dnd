import React, { createContext, useState, useMemo } from "react"

type Context = {
  state: {
    navigation_open: boolean
  }
  actions: {
    setNavigationOpen: (open: boolean | ((open: boolean) => boolean)) => void
  }
}
export const StoreContext = createContext((null as unknown) as Context)

export const Provider: React.FunctionComponent = ({ children }) => {
  const [navigation_open, setNavigationOpen] = useState(false)

  return (
    <StoreContext.Provider
      value={{
        state: {
          navigation_open,
        },
        actions: {
          setNavigationOpen,
        },
        // actions: useMemo(
        //   () => ({
        //     setNavigationOpen,
        //   }),
        //   [],
        // ),
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}
