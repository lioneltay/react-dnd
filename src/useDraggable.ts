import { useEffect, useContext } from "react"
import { Context } from "./context"
import { Type } from "./state"
import { noop } from "./utils"

type OnDragStartInput = {
  onDragEnd?: () => void
}

type DraggableOptions = {
  onDragStart?: (input: OnDragStartInput) => void
  onDragEnd?: () => void
  data: any
  type: Type
}

type DraggableResult = {
  event_handlers: {
    onPointerDown: () => void
  }
}

export const useDraggable = ({
  onDragStart = noop,
  onDragEnd = noop,
  data,
  type,
}: DraggableOptions): DraggableResult => {
  const { actions } = useContext(Context)

  return {
    event_handlers: {
      onPointerDown: () => {
        actions.startDrag({ data, type })
        onDragStart({ onDragEnd })
      },
    },
  }
}
