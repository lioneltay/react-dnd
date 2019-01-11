import { useContext, useState } from "react"
import { Context } from "./context"

import { Type } from "./state"

import { matchType, noop } from "./utils"

export type UseDropzoneOptions<T> = {
  canDrop?: (info: { data: T }) => boolean
  onDrop?: (info: { data: T; type: Type }) => void
  type: Type
  onDragEnter?: (
    info: {
      data: T
      type: Type
      updateData: (data: T) => void
    },
  ) => void
  onDragLeave?: (info: { data: T }) => void
}

export type UseDropzoneResult = {
  hovering: boolean
  can_drop: boolean
  is_dragging: boolean
  event_handlers: {
    onPointerUp: (e: React.PointerEvent) => void
    onPointerEnter: () => void
    onPointerLeave: () => void
  }
}

export const useDropzone = <T = any>({
  canDrop = () => true,
  onDrop = noop,
  onDragEnter = noop,
  onDragLeave = noop,
  type,
}: UseDropzoneOptions<T>): UseDropzoneResult => {
  const { state, actions } = useContext(Context)
  const [hovering, setHovering] = useState(false)

  const calculateCanDrop = () =>
    state.is_dragging &&
    matchType(state.type, type) &&
    canDrop({ data: state.data })

  return {
    hovering,
    can_drop: calculateCanDrop(),
    is_dragging: state.is_dragging,

    event_handlers: {
      onPointerUp: (e: React.PointerEvent) => {
        if (calculateCanDrop()) {
          console.log("candrop", state.type, type, state.dropped)
          onDrop({ data: state.data, type: state.type })

          const { x, y } = e.currentTarget.getBoundingClientRect() as DOMRect
          actions.drop({
            dropzone: {
              clientX: x,
              clientY: y,
              pointer: {
                relative_x: e.clientX - x,
                relative_y: e.clientY - y,
              },
            },
          })
        }
      },

      onPointerEnter: () => {
        setHovering(true)
        if (state.is_dragging) {
          onDragEnter({
            type: state.type,
            data: state.data,
            updateData: (data: any) => {
              actions.updateData({ data })
            },
          })
        }
      },

      onPointerLeave: () => {
        setHovering(false)
        if (state.is_dragging) {
          onDragLeave({ data: state.data })
        }
      },
    },
  }
}
