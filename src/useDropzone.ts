import { useContext, useState, useCallback } from "react"
import { Context } from "./context"

import { Type } from "./state"

import { matchType, noop } from "./utils"

type UseDropzoneOptions = {
  canDrop?: (info: { data: any }) => boolean
  onDrop?: (info: { data: any }) => void
  type: Type
}

type UseDropzoneResult = {
  hovering: boolean
  can_drop: boolean
  event_handlers: {
    onPointerUp: () => void
    onPointerEnter: () => void
    onPointerLeave: () => void
  }
}

export const useDropzone = ({
  canDrop = () => true,
  onDrop = noop,
  type,
}: UseDropzoneOptions): UseDropzoneResult => {
  const { state, actions } = useContext(Context)
  const [hovering, setHovering] = useState(false)

  const calculateCanDrop = () =>
    state.is_dragging &&
    matchType(state.type, type) &&
    canDrop({ data: state.data })

  return {
    hovering,
    can_drop: calculateCanDrop(),

    event_handlers: {
      onPointerUp: () => {
        if (calculateCanDrop()) {
          onDrop({ data: state.data })
          actions.drop()
        }
      },

      onPointerEnter: () => {
        setHovering(true)
      },

      onPointerLeave: () => {
        setHovering(false)
      },
    },
  }
}
