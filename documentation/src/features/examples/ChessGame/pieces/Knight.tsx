import { filterSameSidePositions } from "../utils"
import React from "react"
import { Position, ChessSide, PieceUtils } from "../types"
import { DraggablePiece } from "./Piece"

type Props = {
  position: Position
  side: ChessSide
}

/** Draggable Knight Piece */
const Knight: React.FunctionComponent<Props> = ({ position, side }) => {
  return <DraggablePiece piece="knight" position={position} side={side} />
}

export default Knight

export const utils: PieceUtils = {
  /** Calculates the reachable positions of a Knight */
  getReachablePositions: (board, { position: [r, c], side }): Position[] => {
    return filterSameSidePositions(
      board,
      [
        [r - 2, c + 1],
        [r - 2, c - 1],
        [r + 2, c + 1],
        [r + 2, c - 1],
        [r - 1, c + 2],
        [r - 1, c - 2],
        [r + 1, c + 2],
        [r + 1, c - 2],
      ],
      { side },
    )
  },
}
