import { Actions, ActionTypes, actions } from "./actions"

export type Type = undefined | string | string[]

export type OnDragEndInput = {
  dropped: boolean
  pointer: {
    clientX: number
    clientY: number
    pageX: number
    pageY: number
  }
  dropzone?: {
    clientX: number
    clientY: number
    pointer: {
      relative_x: number
      relative_y: number
    }
  }
  drag_item_info: {
    x: number
    y: number
    offset_x: number
    offset_y: number
    width: number
    height: number
  }
}

export type State =
  | {
      is_dragging: false
      type: undefined
      data: null
      onDragEnd?: undefined
      drag_item_info: null
      dropped: boolean
      drop_result?: {
        dropzone: {
          clientX: number
          clienty: number
          pointer: {
            relative_x: number
            relative_y: number
          }
        }
      }
    }
  | {
      is_dragging: true
      type: Type
      data: any
      onDragEnd?: ((input: OnDragEndInput) => void)
      drag_item_info: {
        x: number
        y: number
        offset_x: number
        offset_y: number
        width: number
        height: number
      }
      dropped: boolean
      drop_result?: {
        dropzone: {
          clientX: number
          clientY: number
          pointer: {
            relative_x: number
            relative_y: number
          }
        }
      }
    }

export const initial_state: State = {
  is_dragging: false,
  type: undefined,
  data: null,
  onDragEnd: undefined,
  drag_item_info: null,
  dropped: false,
  drop_result: undefined,
}

export const reducer: React.Reducer<State, Actions> = (
  state = initial_state,
  action,
) => {
  switch (action.type) {
    case ActionTypes.START_DRAG: {
      return {
        ...state,
        data: action.payload.data,
        is_dragging: true,
        type: action.payload.type,
        onDragEnd: action.payload.onDragEnd,
        drag_item_info: action.payload.drag_item_info,
        dropped: false,
      } as State
    }

    case ActionTypes.END_DRAG: {
      return {
        ...state,
        data: null,
        type: undefined,
        is_dragging: false,
        onDragEnd: undefined,
        drag_item_info: null,
        dropped: false,
      } as State
    }

    case ActionTypes.DROP: {
      return {
        ...state,
        dropped: true,
        drop_result: {
          data: undefined,
          dropzone: action.payload.dropzone,
        },
      } as State
    }

    default: {
      ;((n: never) => {
        return
      })(action)
      return state
    }
  }
}
