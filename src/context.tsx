import React, {
  useEffect,
  useState,
  Fragment,
  useRef,
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
  dimensions: {
    width: number
    height: number
  }
}

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
  const stateRef = useRef(state)
  stateRef.current = state
  const actions = useMemo(() => bindActionCreators(dispatch, action_creators), [
    dispatch,
  ])

  // use react portal to put a fixed viewport size item that collects pointerup events? events will still follow react hierarchy
  useEffect(() => {
    function listener(e: PointerEvent) {
      const state = stateRef.current
      if (state.onDragEnd) {
        state.onDragEnd({
          dropped: state.dropped,
          pointer: {
            clientX: e.clientX,
            clientY: e.clientY,
            pageX: e.pageX,
            pageY: e.pageY,
          },
          dropzone: state.drop_result ? state.drop_result.dropzone : undefined,
          drag_item_info: state.drag_item_info,
        })
      }
      actions.endDrag()
    }
    document.addEventListener("pointerup", listener)
    return () => document.removeEventListener("pointerup", listener)
  }, [])

  return (
    <Context.Provider value={{ state, dispatch, actions }}>
      <Fragment>
        <DragItem
          renderDraggingItem={renderDraggingItem}
          z_index={dragging_item_z_index}
        />
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
