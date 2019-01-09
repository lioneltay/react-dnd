import React, {
  useEffect,
  useState,
  Fragment,
  createContext,
  useContext,
  useReducer,
  useMemo,
} from "react"

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

type RenderPreviewInput = {
  data: any
}

type ProviderProps = {
  renderDraggingItem?: (info: RenderPreviewInput) => React.ReactNode
}

export const Provider: React.FunctionComponent<ProviderProps> = ({
  children,
  renderDraggingItem = () => null,
}) => {
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
      <Fragment>
        <DragItem renderDraggingItem={renderDraggingItem} />
        {children}
      </Fragment>
    </Context.Provider>
  )
}

type DragItemProps = {
  renderDraggingItem: NonNullable<ProviderProps["renderDraggingItem"]>
}

const DragItem: React.FunctionComponent<DragItemProps> = ({
  renderDraggingItem,
}) => {
  const { state } = useContext(Context)

  const [mouse_position, setMousePosition] = useState(null as null | {
    x: number
    y: number
  })

  useEffect(() => {
    function listener(e: PointerEvent) {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    document.addEventListener("pointermove", listener)
    return () => document.removeEventListener("pointermove", listener)
  }, [])

  if (!state.is_dragging) {
    return null
  }

  const translate_x =
    (mouse_position ? mouse_position.x : state.drag_item_info.x) -
    state.drag_item_info.offset_x
  const translate_y =
    (mouse_position ? mouse_position.y : state.drag_item_info.y) -
    state.drag_item_info.offset_y

  return (
    <div
      style={{
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: state.drag_item_info.width,
        height: state.drag_item_info.height,
        transform: `translate(${translate_x}px, ${translate_y}px)`,
      }}
    >
      {renderDraggingItem({ data: state.data })}
    </div>
  )
}
