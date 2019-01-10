import * as React from "react"
import { Type, OnDragEndInput } from "./reducer"

type Action<T extends string> = {
  type: T
}

type ActionWithPayload<T extends string, P> = Action<T> & {
  payload: P
}

type FunctionType = (...args: any[]) => any

type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType }

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<
  A[keyof A]
>

export function bindActionCreators<T, A extends ActionCreatorsMapObject>(
  dispatch: React.Dispatch<T>,
  action_creators: A,
): A {
  return Object.keys(action_creators).reduce(
    (acc, key) => {
      acc[key] = (...args: any[]) => dispatch(action_creators[key](...args))
      return acc
    },
    {} as A,
  )
}

function createAction<T extends string>(type: T): Action<T>
function createAction<T extends string, P>(
  type: T,
  payload: P,
): ActionWithPayload<T, P>
function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload }
}

export enum ActionTypes {
  START_DRAG = "START_DRAG",
  END_DRAG = "END_DRAG",
  DROP = "DROP",
  UPDATE_DATA = "UPDATE_DATA",
}

type StartDragInput = {
  data: any
  type: Type
  onDragEnd?: (info: OnDragEndInput) => void
  drag_item_info: {
    x: number
    y: number
    offset_x: number
    offset_y: number
    width: number
    height: number
  }
}
const startDrag = ({ data, type, onDragEnd, drag_item_info }: StartDragInput) =>
  createAction(ActionTypes.START_DRAG, {
    data,
    type,
    onDragEnd,
    drag_item_info,
  })

const endDrag = () => createAction(ActionTypes.END_DRAG)

type DropInput = {
  dropzone: {
    clientX: number
    clientY: number
    pointer: {
      relative_x: number
      relative_y: number
    }
  }
}
const drop = ({ dropzone: { clientX, clientY, pointer } }: DropInput) =>
  createAction(ActionTypes.DROP, { dropzone: { clientX, clientY, pointer } })

type UpdateDataInput = {
  data: any
}
const updateData = ({ data }: UpdateDataInput) =>
  createAction(ActionTypes.UPDATE_DATA, { data })

export const actions = {
  startDrag,
  endDrag,
  drop,
  updateData,
}

export type Actions = ActionsUnion<typeof actions>
