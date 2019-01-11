import { useContext, useState } from "react"
import { Context } from "./context"
import { matchType, noop } from "./utils"
import { DragType } from "./types"
import { OnDropInput } from "./state"

export type UseDropzoneOptions<D = any> = {
  canDrop?: (info: { data: D }) => boolean
  onDrop?: (info: OnDropInput<D>) => any
  type: DragType
  onDragEnter?: (
    info: {
      data: D
      type: DragType
      updateData: (data: D) => void
    },
  ) => void
  onDragLeave?: (info: { data: D }) => void
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

export const useDropzone = <D = any>({
  canDrop = () => true,
  onDrop = noop,
  onDragEnter = noop,
  onDragLeave = noop,
  type,
}: UseDropzoneOptions<D>): UseDropzoneResult => {
  const { state, actions } = useContext<Context<D>>(Context as any)
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
          const { x, y } = e.currentTarget.getBoundingClientRect() as DOMRect
          actions.drop({
            onDrop,
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
            updateData: data => {
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
