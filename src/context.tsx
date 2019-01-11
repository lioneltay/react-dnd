import React, {
  createContext,
  useEffect,
  useState,
  Fragment,
  useContext,
  useReducer,
  useMemo,
} from "react"

import {
  DnDState,
  RenderPreviewInput,
  Action,
  reducer,
  initial_state,
  actions as action_creators,
  bindActionCreators,
} from "./state"

export type Context<D = unknown> = {
  dispatch: React.Dispatch<Action>
  actions: typeof action_creators
  state: DnDState<D>
}

export const Context = createContext((null as unknown) as Context)

type ProviderProps = {
  /**
   * What to render under the cursor while dragging.
   * The render item will automatically be placed in a container the same size as the item that is currently being dragged
   */
  renderDraggingItem?: (info: RenderPreviewInput) => React.ReactNode
  /** Defaults to 1000, can be customised. Just to ensure that the cursor item appears above other items */
  dragging_item_z_index?: number
}

export const Provider: React.FunctionComponent<ProviderProps> = ({
  children,
  renderDraggingItem = () => null,
  dragging_item_z_index,
}) => {
  const [state, dispatch] = useReducer(reducer, initial_state)
  const actions = useMemo(() => bindActionCreators(dispatch, action_creators), [
    dispatch,
  ])

  // use react portal to put a fixed viewport size item that collects pointerup events? events will still follow react hierarchy
  useEffect(() => {
    function listener(e: PointerEvent) {
      actions.endDrag({
        pointer: {
          clientX: e.clientX,
          clientY: e.clientY,
          pageX: e.pageX,
          pageY: e.pageY,
        },
      })
    }
    document.addEventListener("pointerup", listener)
    return () => document.removeEventListener("pointerup", listener)
  }, [])

  return (
    <Context.Provider value={{ state, dispatch, actions }}>
      <Fragment>
        {state.is_dragging && (
          <DragItem
            renderDraggingItem={state.renderer.render || renderDraggingItem}
            z_index={state.renderer.z_index || dragging_item_z_index}
          />
        )}
        {children}
      </Fragment>
    </Context.Provider>
  )
}

type DragItemProps = {
  renderDraggingItem: NonNullable<ProviderProps["renderDraggingItem"]>
  z_index?: number
}

const DragItem: React.FunctionComponent<DragItemProps> = ({
  renderDraggingItem,
  z_index = 1000,
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
        zIndex: z_index,
        pointerEvents: "none",
        position: "fixed",
        top: 0,
        left: 0,
        width: state.drag_item_info.width,
        height: state.drag_item_info.height,
        transform: `translate(${translate_x}px, ${translate_y}px)`,
      }}
    >
      {renderDraggingItem({
        data: state.data,
        dimensions: {
          width: state.drag_item_info.width,
          height: state.drag_item_info.height,
        },
      })}
    </div>
  )
}
