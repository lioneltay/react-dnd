export type Position = [number, number]

export type Piece = "knight" | null

export type BoardTile = {
  piece: Piece
}

export type Board = [
  BoardTile,
  BoardTile,
  BoardTile,
  BoardTile,
  BoardTile,
  BoardTile,
  BoardTile,
  BoardTile
][]
