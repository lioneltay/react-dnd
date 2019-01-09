import React from "react"
import styled from "styled-components"
import { useDraggable } from "dnd"
import { Position, Board } from "./types"

const Icon = styled.i`
  user-select: none;
  cursor: pointer;
  color: white;
  font-size: 30px;
`

/** Presentational component for a Knight Chess Piece */
export const KnightDisplay: React.FunctionComponent<
  React.HTMLAttributes<HTMLElement>
> = props => (
  <Icon
    {...props}
    className="fas fa-chess-knight"
    onDragStart={e => e.preventDefault()}
  />
)

type Props = {
  position: Position
}

/** Draggable Knight Piece */
const Knight: React.FunctionComponent<Props> = ({ position }) => {
  const { event_handlers, local } = useDraggable({
    data: {
      piece: "knight",
      position,
    },
    type: "piece",
  })

  return local.is_dragging ? null : (
    <KnightDisplay {...event_handlers} className="fas fa-chess-knight" />
  )
}

export default Knight

export const utils = {
  /** Calculates the reachable positions of a Knight */
  getReachablePositions: (board: Board, position: Position): Position[] => {
    const [x, y] = position

    return [
      [x - 2, y + 1],
      [x - 2, y - 1],
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x - 1, y + 2],
      [x - 1, y - 2],
      [x + 1, y + 2],
      [x + 1, y - 2],
    ]
  },
}
