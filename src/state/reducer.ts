import { Actions, ActionTypes, actions } from "./actions"

export type Type = undefined | string | string[]

export type State =
  | {
      is_dragging: false
      type: undefined
      data: null
      onDragEnd?: undefined
    }
  | {
      is_dragging: true
      type: Type
      data: any
      onDragEnd?: (() => void)
    }

export const initial_state: State = {
  is_dragging: false,
  type: undefined,
  data: null,
  onDragEnd: undefined,
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
      }
    }

    case ActionTypes.END_DRAG: {
      return {
        ...state,
        data: null,
        type: undefined,
        is_dragging: false,
        onDragEnd: undefined,
      }
    }

    case ActionTypes.DROP: {
      return {
        ...state,
      }
    }

    default: {
      ;((n: never) => {})(action)
      return state
    }
  }
}
