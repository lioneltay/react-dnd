import { useContext, useState } from "react"
import { Context } from "./context"

import { Type } from "./state"

import { matchType } from "./utils"

type UseDropzoneOptions = {
  onDrop: (info: { data: any }) => void
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
  onDrop,
  type,
}: UseDropzoneOptions): UseDropzoneResult => {
  const context = useContext(Context)
  const [hovering, setHovering] = useState(false)

  return {
    hovering,
    can_drop: matchType(context.state.type, type),

    event_handlers: {
      onPointerUp: () => {
        if (matchType(context.state.type, type)) {
          onDrop({ data: context.state.data })
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
