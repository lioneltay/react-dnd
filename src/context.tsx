import React, { useEffect } from "react"
import { createContext, useCallback, useReducer, useMemo } from "react"

import {
  State,
  Actions,
  reducer,
  initial_state,
  actions as action_creators,
  bindActionCreators,
} from "./state"

type Context = {
  dispatch: React.Dispatch<Actions>
  actions: typeof action_creators
  state: State
}

export const Context = createContext((null as unknown) as Context)

export const Provider: React.FunctionComponent<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial_state)
  const actions = useMemo(() => bindActionCreators(dispatch, action_creators), [
    dispatch,
  ])

  // use react portal to put a fixed viewport size item that collects pointerup events? events will still follow react hierarchy
  useEffect(() => {
    function listener() {
      actions.endDrag()
      state.onDragEnd && state.onDragEnd()
    }

    document.addEventListener("pointerup", listener)

    return () => document.removeEventListener("pointerup", listener)
  }, [])

  return (
    <Context.Provider value={{ state, dispatch, actions }}>
      {children}
    </Context.Provider>
  )
}
