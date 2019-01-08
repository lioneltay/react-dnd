import { useEffect, useContext } from "react"
import { Context } from "./context"
import { Type } from "./state"

type DraggableOptions = {
  onDragStart: () => void
  onDragEnd: () => void
  data: any
  type: Type
}

type DraggableResult = {
  event_handlers: {
    onPointerDown: () => void
  }
}

export const useDraggable = ({
  onDragStart,
  onDragEnd,
  data,
  type,
}: DraggableOptions): DraggableResult => {
  const { actions } = useContext(Context)

  // use react portal to put a fixed viewport size item that collects pointerup events? events will still follow react hierarchy
  useEffect(() => {
    document.addEventListener("pointerup", () => {
      actions.endDrag()
      onDragEnd()
    })
  }, [])

  return {
    event_handlers: {
      onPointerDown: () => {
        actions.startDrag({ data, type })
        onDragStart()
      },
    },
  }
}
