import { DragType } from "../types"
import { OnDragEndInput } from "./reducer"

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

// export type DnDState =
//   | {
//       is_dragging: false
//       type: undefined
//       data: null
//       onDragEnd?: undefined
//       drag_item_info: null
//       dropped: boolean
//       drop_result?: DropResult
//     }
//   | {
//       is_dragging: true
//       type: DragType
//       data: any
//       onDragEnd?: ((input: OnDragEndInput) => void)
//       drag_item_info: DragItemInfo
//       dropped: boolean
//       drop_result?: DropResult
//     }

export type DnDState =
  | {
      is_dragging: true
      dropped: false
      type: DragType
      data: any
      drag_item_info: DragItemInfo
      drop_result: null
      callbacks: {
        onDragEnd: null | ((input: OnDragEndInput) => void)
      }
    }
  | {
      is_dragging: false
      dropped: true
      type: null
      data: any
      drop_result: DropResult
      drag_item_info: DragItemInfo
      callbacks: {
        onDragEnd: null | ((input: OnDragEndInput) => void)
      }
    }
  | {
      is_dragging: false
      dropped: false
      type: null
      data: null
      drop_result: null
      drag_item_info: null
      callbacks: {
        onDragEnd: null
      }
    }
