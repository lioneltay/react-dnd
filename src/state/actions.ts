import * as React from "react"
import { Type } from "./reducer"

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
}

type StartDragInput = {
  data: any
  type: Type
  onDragEnd?: () => void
}
const startDrag = ({ data, type, onDragEnd }: StartDragInput) =>
  createAction(ActionTypes.START_DRAG, { data, type, onDragEnd })

const endDrag = () => createAction(ActionTypes.END_DRAG)

const drop = () => createAction(ActionTypes.DROP)

export const actions = {
  startDrag,
  endDrag,
  drop,
}

export type Actions = ActionsUnion<typeof actions>
