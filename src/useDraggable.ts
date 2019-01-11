import { useEffect, useContext, useRef } from "react"
import { Context } from "./context"
import { noop } from "./utils"
import { OnDragEndInput, RenderPreviewInput } from "./state"
import { DragType } from "./types"

type OnDragStartInput = {}

export type DraggableOptions<T> = {
  onDragStart?: (input: OnDragStartInput) => void
  onDragEnd?: (input: OnDragEndInput) => void
  data?: T
  type: DragType
  renderDraggingItem?: (info: RenderPreviewInput) => React.ReactNode
  render_z_index?: number
}

export type DraggableResult = {
  state: {
    is_dragging: boolean
    data: unknown
  }
  event_handlers: {
    ref: React.Ref<any>
    onPointerDown: (e: React.PointerEvent) => void
  }
}

export const useDraggable = <T = unknown>({
  render_z_index,
  renderDraggingItem,
  onDragStart = noop,
  onDragEnd = noop,
  data,
  type,
}: DraggableOptions<T>): DraggableResult => {
  const { actions, state } = useContext(Context)

  const domRef = useRef(null as null | HTMLElement)

  useEffect(
    () => {
      const listener = (e: TouchEvent) => {
        e.preventDefault()
      }

      if (domRef.current) {
        domRef.current.addEventListener("touchstart", listener)
      }

      return () =>
        domRef.current &&
        domRef.current.removeEventListener("touchstart", listener)
    },
    [domRef.current],
  )

  return {
    state: {
      is_dragging: state.is_dragging,
      data: state.data,
    },
    event_handlers: {
      ref: domRef,

      onPointerDown: (e: React.PointerEvent) => {
        const {
          x,
          y,
          width,
          height,
        } = e.currentTarget.getBoundingClientRect() as DOMRect

        const offset_x = e.clientX - x
        const offset_y = e.clientY - y

        actions.startDrag({
          onDragStart,
          onDragEnd,
          renderer: {
            render: renderDraggingItem,
            z_index: render_z_index,
          },
          data,
          type,
          drag_item_info: {
            x,
            y,
            offset_x,
            offset_y,
            width,
            height,
          },
        })
      },
    },
  }
}
