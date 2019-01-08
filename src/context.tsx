import * as React from "react"
import { createContext, useCallback, useReducer, useMemo } from "react"

import {
  State,
  Actions,
  reducer,
  initial_state,
  actions,
  bindActionCreators,
} from "./state"

type Context = {
  dispatch: React.Dispatch<Actions>
  actions: typeof actions
  state: State
}

export const Context = createContext((null as unknown) as Context)

export const Provider: React.FunctionComponent<{}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial_state)
  const action_creators = useMemo(() => bindActionCreators(dispatch, actions), [
    dispatch,
  ])

  return (
    <Context.Provider value={{ state, dispatch, actions: action_creators }}>
      {children}
    </Context.Provider>
  )
}
