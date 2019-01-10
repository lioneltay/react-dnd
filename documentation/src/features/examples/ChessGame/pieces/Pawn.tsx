import {
  filterSameSidePositions,
  getTile,
  forwardDirection,
  positionInBoard,
} from "../utils"
import React from "react"
import { ChessSide, PieceUtils, Position } from "../types"
import { DraggablePiece } from "./Piece"

type Props = {
  position: Position
  side: ChessSide
}

/** Draggable Pawn Piece */
const Pawn: React.FunctionComponent<Props> = ({ position, side }) => {
  return <DraggablePiece piece="pawn" position={position} side={side} />
}

export default Pawn

export const utils: PieceUtils = {
  /** Calculates the reachable positions of a Pawn */
  getReachablePositions: (board, { position: [r, c], side }): Position[] => {
    const forward_left: Position = [r + forwardDirection(side), c - 1]
    const forward: Position = [r + forwardDirection(side), c]
    const forward_right: Position = [r + forwardDirection(side), c + 1]

    const positions: Position[] = []

    /** Can only move if there is no piece infront */
    if (positionInBoard(forward)) {
      const forward_tile = getTile(board, forward)
      if (!forward_tile.piece) {
        positions.push(forward)
      }
    }

    /** Can only move if there is an enemy */
    if (positionInBoard(forward_left)) {
      const forward_left_tile = getTile(board, forward_left)
      if (forward_left_tile.side && forward_left_tile.side !== side) {
        positions.push(forward_left)
      }
    }

    /** Can only move if there is an enemy */
    if (positionInBoard(forward_left)) {
      const forward_right_tile = getTile(board, forward_right)
      if (forward_right_tile.side && forward_right_tile.side !== side) {
        positions.push(forward_right)
      }
    }

    return filterSameSidePositions(board, positions, { side })
  },
}
