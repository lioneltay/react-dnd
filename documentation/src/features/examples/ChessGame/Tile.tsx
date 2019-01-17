import React, { useContext, useMemo } from "react"
import styled from "styled-components"
import { useDropzone } from "@tekktekk/react-dnd"
import * as R from "ramda"

import { Context } from "./context"
import { Position, ChessPiece, ChessSide, DragData } from "./types"

import Bishop, { utils as bishop_utils } from "./pieces/Bishop"
import Knight, { utils as knight_utils } from "./pieces/Knight"
import King, { utils as king_utils } from "./pieces/King"
import Rook, { utils as rook_utils } from "./pieces/Rook"
import Queen, { utils as queen_utils } from "./pieces/Queen"
import Pawn, { utils as pawn_utils } from "./pieces/Pawn"

const PIECES = {
  rook: Rook,
  knight: Knight,
  bishop: Bishop,
  queen: Queen,
  king: King,
  pawn: Pawn,
}

const UTILS = {
  rook: rook_utils,
  knight: knight_utils,
  bishop: bishop_utils,
  queen: queen_utils,
  king: king_utils,
  pawn: pawn_utils,
}

/** Figure out if the tile be a light or dark color based on position */
function lightTile(position: Position): boolean {
  return (position[0] + position[1]) % 2 === 0
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`

type Props =
  | {
      position: Position
      piece: undefined
      side: undefined
    }
  | {
      position: Position
      piece: ChessPiece
      side: ChessSide
    }

const Tile: React.FunctionComponent<Props> = ({ position, piece, side }) => {
  const { moveTile, board } = useContext(Context)

  const { event_handlers, can_drop } = useDropzone<DragData>({
    type: "piece",

    onDrop: ({ data }) => {
      moveTile(data.position, position)
    },

    canDrop: ({ data }) => {
      return UTILS[data.piece].getReachablePositions(board, data).some(p => {
        return R.equals(p, position)
      })
    },
  })

  return useMemo(
    () => {
      return (
        <Container
          {...event_handlers()}
          style={{
            backgroundColor: can_drop
              ? "lightgreen"
              : lightTile(position)
              ? "#F6C08E"
              : "#C37B3C",
          }}
        >
          {(() => {
            if (!piece || !side) {
              return null
            }

            const Piece = PIECES[piece]
            return <Piece position={position} side={side} />
          })()}
        </Container>
      )
    },
    [can_drop, position, piece, side],
  )
}

export default Tile
