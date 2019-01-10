import React from "react"
import { Position, Board, ChessSide, PieceUtils } from "../types"
import { DraggablePiece } from "./Piece"
import {
  filterSameSidePositions,
  positionInBoard,
  getTile,
  travelUntilCollide,
} from "../utils"

type Props = {
  position: Position
  side: ChessSide
}

/** Draggable Bishop Piece */
const Bishop: React.FunctionComponent<Props> = ({ position, side }) => {
  return <DraggablePiece piece="bishop" position={position} side={side} />
}

export default Bishop

export const utils: PieceUtils = {
  /** Calculates the reachable positions of a Bishop */
  getReachablePositions: (board, { position, side }): Position[] => {
    const positions: Position[] = []

    const addPosition = (position: Position) => positions.push(position)
    travelUntilCollide(board, [1, 1], { side, position }, addPosition)
    travelUntilCollide(board, [1, -1], { side, position }, addPosition)
    travelUntilCollide(board, [-1, 1], { side, position }, addPosition)
    travelUntilCollide(board, [-1, -1], { side, position }, addPosition)

    return filterSameSidePositions(board, positions, { side })
  },
}
