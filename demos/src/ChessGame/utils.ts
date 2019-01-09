import { Board, BoardTile, Position, BoardRow, ChessSide } from "./types"

const createEmptyTile = (): BoardTile => ({})

export const createEmptyRow = (): BoardRow =>
  Array(8)
    .fill(null)
    .map(createEmptyTile) as BoardRow

export const createPawnRow = (side: ChessSide): BoardRow =>
  Array(8)
    .fill(null)
    .map(() => ({ piece: "pawn", side })) as BoardRow

export const getTile = (board: Board, [x, y]: Position): BoardTile => {
  return { ...board[x][y] }
}

export const setTile = (
  board: Board,
  [x, y]: Position,
  tile: BoardTile,
): Board => {
  return [
    ...board.slice(0, x),
    [
      ...board[x].slice(0, y),
      { ...createEmptyTile(), ...tile },
      ...board[x].slice(y + 1),
    ],
    ...board.slice(x + 1),
  ] as Board
}

export const clearTile = (board: Board, position: Position): Board => {
  return setTile(board, position, createEmptyTile())
}

export const moveTile = (board: Board, from: Position, to: Position): Board => {
  const b1 = setTile(board, to, getTile(board, from))
  return clearTile(b1, from)
}

export const positionInBoard = ([x, y]: Position): boolean =>
  x >= 0 && x <= 7 && y >= 0 && y <= 7

export const forwardDirection = (side: ChessSide) => (side === "black" ? 1 : -1)

export const filterSameSidePositions = (
  board: Board,
  positions: Position[],
  info: { side: ChessSide },
): Position[] => {
  return positions.filter(position => {
    if (!positionInBoard(position)) {
      return false
    }

    const tile = getTile(board, position)
    return !tile.side || tile.side !== info.side
  })
}

export const travelUntilCollide = (
  board: Board,
  [dr, dc]: Position,
  { side, position: [r, c] }: { side: ChessSide; position: Position },
  cb: (position: Position) => void,
) => {
  let current_position: Position = [r, c]
  let next_position: Position = [r, c]
  let collided = false
  while (!collided) {
    next_position = [current_position[0] + dr, current_position[1] + dc]
    if (!positionInBoard(next_position)) {
      break
    }

    const tile = getTile(board, next_position)
    if (tile.side) {
      collided = true
      if (tile.side !== side) {
        cb(next_position)
      }
    } else {
      cb(next_position)
    }
    current_position = next_position
  }
}
