import React from "react"
import { Position, Board, ChessSide, PieceUtils } from "../types"
import { DraggablePiece } from "./Piece"
import {
  filterSameSidePositions,
  positionInBoard,
  getTile,
  travelUntilCollide,
} from "ChessGame/utils"

type Props = {
  position: Position
  side: ChessSide
}

/** Draggable Queen Piece */
const Queen: React.FunctionComponent<Props> = ({ position, side }) => {
  return <DraggablePiece piece="queen" position={position} side={side} />
}

export default Queen

export const utils: PieceUtils = {
  /** Calculates the reachable positions of a Queen */
  getReachablePositions: (board, { side, position }): Position[] => {
    const positions: Position[] = []

    const addPosition = (position: Position) => positions.push(position)
    travelUntilCollide(board, [1, 1], { side, position }, addPosition)
    travelUntilCollide(board, [1, 0], { side, position }, addPosition)
    travelUntilCollide(board, [1, -1], { side, position }, addPosition)
    travelUntilCollide(board, [-1, 1], { side, position }, addPosition)
    travelUntilCollide(board, [-1, 0], { side, position }, addPosition)
    travelUntilCollide(board, [-1, 1], { side, position }, addPosition)
    travelUntilCollide(board, [0, 1], { side, position }, addPosition)
    travelUntilCollide(board, [0, -1], { side, position }, addPosition)

    return filterSameSidePositions(board, positions, { side })
  },
}
