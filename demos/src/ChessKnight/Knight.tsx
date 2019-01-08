import React from "react"
import styled from "styled-components"
import { useDraggable } from "dnd"
import { Position, Board } from "./types"

const Icon = styled.i`
  color: white;
  font-size: 30px;
`

type Props = {
  position: Position
}

const Knight: React.FunctionComponent<Props> = ({ position }) => {
  const { event_handlers } = useDraggable({
    data: {
      piece: "knight",
      position,
    },
    type: "piece",
    onDragEnd: () => {
      console.log(position)
    },
  })

  return (
    <Icon
      {...event_handlers}
      onDragStart={e => e.preventDefault()}
      className="fas fa-chess-knight"
    />
  )
}

export default Knight

export const utils = {
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
