type Action<T extends string> = {
  type: T
}

type ActionWithPayload<T extends string, P> = Action<T> & {
  payload: P
}

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

export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, P>(
  type: T,
  payload: P,
): ActionWithPayload<T, P>
export function createAction<T extends string, P>(type: T, payload?: P) {
  return payload === undefined ? { type } : { type, payload }
}
