import { useEffect, useContext, useState } from "react"
import { Context } from "./context"
import { Type } from "./state"
import { noop } from "./utils"
import { OnDragEndInput } from "./state"

type OnDragStartInput = {}

type DraggableOptions<T> = {
  onDragStart?: (input: OnDragStartInput) => void
  onDragEnd?: (input: OnDragEndInput) => void
  data?: T
  type: Type
}

type DraggableResult = {
  local: {
    is_dragging: boolean
  }
  state: {
    is_dragging: boolean
  }
  event_handlers: {
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

  return {
    local: {
      is_dragging,
    },
    state: {
      is_dragging: state.is_dragging,
    },
    event_handlers: {
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
        onDragStart({})
      },
    },
  }
}
