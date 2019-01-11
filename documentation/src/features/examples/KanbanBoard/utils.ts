export function move<T>(from: number, to: number, arr: T[]): T[] {
  const items = [...arr]
  items.splice(to, 0, items.splice(from, 1)[0])
  return items
}

export function update<T>(position: number, data: T, arr: T[]): T[] {
  return [...arr.slice(0, position), data, ...arr.slice(position + 1)]
}

export function insert<T>(position: number, data: T, arr: T[]): T[] {
  return [...arr.slice(0, position), data, ...arr.slice(position)]
}

export function remove<T>(position: number, arr: T[]): T[] {
  return [...arr.slice(0, position), ...arr.slice(position + 1)]
}
