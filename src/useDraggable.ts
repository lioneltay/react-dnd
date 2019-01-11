import { useEffect, useContext, useState, useRef } from "react"
import { Context } from "./context"
import { noop } from "./utils"
import { OnDragEndInput } from "./state"
import { DragType } from "./types"

type OnDragStartInput = {}

export type DraggableOptions<T> = {
  onDragStart?: (input: OnDragStartInput) => void
  onDragEnd?: (input: OnDragEndInput) => void
  data?: T
  type: DragType
}

export type DraggableResult = {
  local: {
    is_dragging: boolean
  }
  state: {
    is_dragging: boolean
  }
  event_handlers: {
    ref: React.Ref<any>
    onPointerDown: (e: React.PointerEvent) => void
  }
}

export const useDraggable = <T = any>({
  onDragStart = noop,
  onDragEnd = noop,
  data,
  type,
}: DraggableOptions<T>): DraggableResult => {
  const { actions, state } = useContext(Context)
  const [is_dragging, setIsDragging] = useState(false)

  useEffect(() => {
    const notDragging = () => setIsDragging(false)
    document.addEventListener("pointerup", notDragging)
    return () => document.removeEventListener("pointerup", notDragging)
  }, [])

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
    local: {
      is_dragging,
    },
    state: {
      is_dragging: state.is_dragging,
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

        setIsDragging(true)
        actions.startDrag({
          onDragEnd,
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
