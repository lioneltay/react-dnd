export type Position = [number, number]

export type ChessPiece =
  | "pawn"
  | "rook"
  | "knight"
  | "bishop"
  | "king"
  | "queen"

export type BoardTile = {
  piece?: ChessPiece
  side?: ChessSide
}

export type BoardRow = [
  BoardTile,
  BoardTile,
  BoardTile,
  BoardTile,
  BoardTile,
  BoardTile,
  BoardTile,
  BoardTile
]

export type Board = BoardRow[]

export type ChessSide = "black" | "white"

export type DragData = {
  piece: ChessPiece
  side: ChessSide
  position: Position
}

export type PieceUtils = {
  getReachablePositions: (
    board: Board,
    data: { position: Position; side: ChessSide },
  ) => Position[]
}