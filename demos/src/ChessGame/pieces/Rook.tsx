import React from "react"
import { Position, Board, ChessSide, PieceUtils } from "../types"
import { DraggablePiece } from "./Piece"
import { travelUntilCollide, filterSameSidePositions } from "ChessGame/utils"

type Props = {
  position: Position
  side: ChessSide
}

/** Draggable Rook Piece */
const Rook: React.FunctionComponent<Props> = ({ position, side }) => {
  return <DraggablePiece piece="rook" position={position} side={side} />
}

export default Rook

export const utils: PieceUtils = {
  /** Calculates the reachable positions of a Rook */
  getReachablePositions: (board, { position, side }) => {
    const positions: Position[] = []

    const addPosition = (position: Position) => positions.push(position)
    travelUntilCollide(board, [1, 0], { side, position }, addPosition)
    travelUntilCollide(board, [-1, 0], { side, position }, addPosition)
    travelUntilCollide(board, [0, 1], { side, position }, addPosition)
    travelUntilCollide(board, [0, -1], { side, position }, addPosition)

    return filterSameSidePositions(board, positions, { side })
  },
}
