import React, { useContext } from "react"
import styled from "styled-components"
import { useDropzone } from "dnd"
import * as R from "ramda"

import { Context } from "./context"
import { Position, Piece } from "./types"
import Knight, { utils as knight_utils } from "./Knight"

function lightTile(position: Position): boolean {
  return (position[0] + position[1]) % 2 === 0
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`

type Props = {
  position: Position
  piece: Piece
}

const Tile: React.FunctionComponent<Props> = ({
  position,
  children,
  piece,
}) => {
  const { moveTile, board } = useContext(Context)

  const { event_handlers, can_drop } = useDropzone({
    type: "piece",

    onDrop: ({ data }) => {
      moveTile(data.position, position)
    },

    canDrop: ({ data }) => {
      return knight_utils
        .getReachablePositions(board, data.position)
        .some(p => {
          return R.equals(p, position)
        })
    },
  })

  return (
    <Container
      {...event_handlers}
      style={{
        backgroundColor: can_drop
          ? "lightgreen"
          : lightTile(position)
          ? "#CDBC96"
          : "#11120D",
      }}
    >
      {piece === "knight" ? <Knight position={position} /> : null}
    </Container>
  )
}

export default Tile
