import { useContext, useState, useCallback } from "react"
import { Context } from "./context"

import { Type } from "./state"

import { matchType, noop } from "./utils"

type UseDropzoneOptions<T> = {
  canDrop?: (info: { data: T }) => boolean
  onDrop?: (info: { data: T }) => void
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

export const useDropzone = <T = any>({
  canDrop = () => true,
  onDrop = noop,
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

type FunctionType<A extends any[] = any[], R = any> = (...args: A) => R

type Arguments<T extends FunctionType> = T extends FunctionType<infer A, any>
  ? A
  : never

export const createUseDropzone = <D extends any>() => {
  return <T extends D>(...args: Arguments<typeof useDropzone>) =>
    useDropzone<T>(...args)
}
