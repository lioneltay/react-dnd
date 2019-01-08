import { Type } from "./state"

export function noop() {}

export function matchType(candidate: Type, types: Type): boolean {
  if (typeof types === "undefined" || typeof candidate === "undefined") {
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
