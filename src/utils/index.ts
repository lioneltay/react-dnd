import { DragType } from "../types"

export function assertNever(n: never) {
  return
}

export function noop(): void {
  return
}

export function matchType(candidate: DragType, types: DragType): boolean {
  if (candidate === null) {
    return false
  }

  if (types === null) {
    return true
  }

  if (!Array.isArray(types)) {
    return matchType(candidate, [types])
  }

  if (Array.isArray(candidate)) {
    return candidate.some(type => matchType(type, types))
  }

  return types.includes(candidate)
}
