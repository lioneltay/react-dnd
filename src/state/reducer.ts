import { Action, ActionTypes } from "./actions"
import { assertNever } from "../utils"

import { DnDState } from "./DnDState"
import { DragType } from "../types"

export type OnDropInput = {
  data: any
  type: DragType
}

export type OnDragStartInput = {}

export type OnDragEndInput = {
  dropped: boolean
  pointer: {
    clientX: number
    clientY: number
    pageX: number
    pageY: number
  }
  dropzone: null | {
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

export const initial_state: DnDState = {
  is_dragging: false,
  dropped: false,
  type: null,
  data: null,
  drag_item_info: null,
  drop_result: null,
  callbacks: {
    onDragEnd: null,
  },
}

export const reducer: React.Reducer<DnDState, Action> = (
  state = initial_state,
  action,
) => {
  switch (action.type) {
    case ActionTypes.START_DRAG: {
      if (state.is_dragging) {
        return state
      }

      const new_state: DnDState = {
        is_dragging: true,
        dropped: false,
        data: action.payload.data,
        type: action.payload.type,
        drop_result: null,
        callbacks: {
          onDragEnd: action.payload.onDragEnd,
        },
        drag_item_info: action.payload.drag_item_info,
      }

      action.payload.onDragStart({})

      return new_state
    }

    case ActionTypes.END_DRAG: {
      if (!state.is_dragging && !state.dropped) {
        return state
      }

      const new_state: DnDState = {
        is_dragging: false,
        dropped: false,
        data: null,
        type: null,
        drop_result: null,
        callbacks: {
          onDragEnd: null,
        },
        drag_item_info: null,
      }

      if (state.callbacks.onDragEnd) {
        state.callbacks.onDragEnd({
          dropped: state.dropped,
          pointer: action.payload.pointer,
          dropzone: state.dropped ? state.drop_result.dropzone : null,
          drag_item_info: state.drag_item_info,
        })
      }

      return new_state
    }

    case ActionTypes.DROP: {
      if (state.dropped) {
        return state
      }

      const drop_data = action.payload.onDrop({
        data: state.data,
        type: state.type,
      })

      const new_state: DnDState = {
        is_dragging: false,
        dropped: true,
        drop_result: {
          data: drop_data,
          dropzone: action.payload.dropzone,
        },
        data: state.data,
        type: state.type,
        callbacks: {
          onDragEnd: state.callbacks.onDragEnd,
        },
        drag_item_info: state.drag_item_info,
      } as DnDState

      return new_state
    }

    case ActionTypes.UPDATE_DATA: {
      return {
        ...state,
        data: action.payload.data,
      }
    }

    default: {
      assertNever(action)
      return state
    }
  }
}
