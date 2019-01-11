import { DragType } from "../types"
import { OnDragEndInput } from "./reducer"

export type RenderPreviewInput = {
  data: any
  dimensions: {
    width: number
    height: number
  }
}

type DropResult = {
  data: any
  dropzone: {
    clientX: number
    clientY: number
    pointer: {
      relative_x: number
      relative_y: number
    }
  }
}

type DragItemInfo = {
  x: number
  y: number
  offset_x: number
  offset_y: number
  width: number
  height: number
}

export type DnDState<D = any> =
  | {
      is_dragging: true
      dropped: false
      type: DragType
      data: D
      drag_item_info: DragItemInfo
      drop_result: null
      callbacks: {
        onDragEnd: null | ((input: OnDragEndInput) => void)
      }
      renderer: {
        render?: (info: RenderPreviewInput) => React.ReactNode
        z_index?: number
      }
    }
  | {
      is_dragging: false
      dropped: true
      type: null
      data: D
      drag_item_info: DragItemInfo
      drop_result: DropResult
      callbacks: {
        onDragEnd: null | ((input: OnDragEndInput) => void)
      }
      renderer: null
    }
  | {
      is_dragging: false
      dropped: false
      type: null
      data: null
      drag_item_info: null
      drop_result: null
      callbacks: {
        onDragEnd: null
      }
      renderer: null
    }
