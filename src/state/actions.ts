import * as React from "react"
import { OnDragEndInput, OnDragStartInput, OnDropInput } from "./reducer"
import { createAction, ActionsUnion } from "./utils"
import { DragType } from "../types"
import { noop } from "../utils"
import { RenderPreviewInput } from "./DnDState"

export enum ActionTypes {
  START_DRAG = "START_DRAG",
  END_DRAG = "END_DRAG",
  DROP = "DROP",
  UPDATE_DATA = "UPDATE_DATA",
}

type StartDragInput = {
  data: unknown
  type: DragType
  renderer: {
    render?: (info: RenderPreviewInput) => React.ReactNode
    z_index?: number
  }
  onDragEnd?: (info: OnDragEndInput) => void
  onDragStart?: (info: OnDragStartInput) => void
  drag_item_info: {
    x: number
    y: number
    offset_x: number
    offset_y: number
    width: number
    height: number
  }
}
const startDrag = ({
  renderer,
  data,
  type,
  onDragEnd,
  drag_item_info,
  onDragStart,
}: StartDragInput) =>
  createAction(ActionTypes.START_DRAG, {
    data,
    type,
    onDragEnd: onDragEnd || noop,
    onDragStart: onDragStart || noop,
    drag_item_info,
    renderer,
  })

type EndDragInput = {
  pointer: {
    clientX: number
    clientY: number
    pageX: number
    pageY: number
  }
}
const endDrag = ({ pointer }: EndDragInput) =>
  createAction(ActionTypes.END_DRAG, { pointer })

type DropInput = {
  dropzone: {
    clientX: number
    clientY: number
    pointer: {
      relative_x: number
      relative_y: number
    }
  }
  onDrop: (input: OnDropInput) => unknown
}
const drop = ({ onDrop, dropzone: { clientX, clientY, pointer } }: DropInput) =>
  createAction(ActionTypes.DROP, {
    dropzone: { clientX, clientY, pointer },
    onDrop: onDrop || noop,
  })

type UpdateDataInput = {
  data: unknown
}
const updateData = ({ data }: UpdateDataInput) =>
  createAction(ActionTypes.UPDATE_DATA, { data })

export const actions = {
  startDrag,
  endDrag,
  drop,
  updateData,
}

export type Action = ActionsUnion<typeof actions>
