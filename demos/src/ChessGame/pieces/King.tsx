import { filterSameSidePositions } from "ChessGame/utils"
import React from "react"
import { ChessSide, PieceUtils, Position } from "../types"
import { DraggablePiece } from "./Piece"

type Props = {
  position: Position
  side: ChessSide
}

/** Draggable King Piece */
const King: React.FunctionComponent<Props> = ({ position, side }) => {
  return <DraggablePiece piece="king" position={position} side={side} />
}

export default King

export const utils: PieceUtils = {
  /** Calculates the reachable positions of a King */
  getReachablePositions: (board, { position: [r, c], side }): Position[] => {
    return filterSameSidePositions(
      board,
      [
        [r - 1, c - 1],
        [r - 1, c],
        [r - 1, c + 1],
        [r, c - 1],
        [r, c + 1],
        [r + 1, c - 1],
        [r + 1, c],
        [r + 1, c + 1],
      ],
      { side },
    )
  },
}
