import { KanbanBoard } from "./types"

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

export function moveList(
  board: KanbanBoard,
  from: number,
  to: number,
): KanbanBoard {
  return move(from, to, board)
}

export function moveItem(
  board: KanbanBoard,
  [from_list, from_item]: [number, number],
  [to_list, to_item]: [number, number],
): KanbanBoard {
  if (from_list === to_list) {
    return update(
      from_list,
      {
        ...board[from_list],
        items: move(from_item, to_item, board[from_list].items),
      },
      board,
    )
  }

  // From another list
  const item = board[from_list].items[from_item]

  const removed = update(
    from_list,
    {
      ...board[from_list],
      items: remove(from_item, board[from_list].items),
    },
    board,
  )

  const added = update(
    to_list,
    {
      ...removed[to_list],
      items: insert(to_item, item, removed[to_list].items),
    },
    removed,
  )

  return added
}
