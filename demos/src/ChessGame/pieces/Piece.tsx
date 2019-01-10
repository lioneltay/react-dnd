import React, { useMemo, forwardRef } from "react"
import styled from "styled-components"
import { Position, ChessSide, DragData, ChessPiece } from "../types"
import { useDraggable } from "dnd"

const Icon = styled.i`
  user-select: none;
  cursor: pointer;
  font-size: 30px;
`

type PieceProps = React.HTMLAttributes<HTMLElement> & {
  piece: ChessPiece
  side: ChessSide
}

// export const Piece: React.FunctionComponent<PieceProps> =({
//   piece,
//   side,
//   ...rest
// }) => {
//   return (
//     <Icon
//       {...rest}
//       style={{ color: side === "black" ? "black" : "white" }}
//       className={`fas fa-chess-${piece}`}
//       onDragStart={e => e.preventDefault()}
//     />
//   )
// }

export const Piece = forwardRef<HTMLElement, PieceProps>(
  ({ piece, side, ...rest }, ref) => {
    return (
      <Icon
        ref={ref}
        {...rest}
        style={{ color: side === "black" ? "black" : "white" }}
        className={`fas fa-chess-${piece}`}
        onDragStart={e => e.preventDefault()}
      />
    )
  },
)

type DraggablePieceProps = {
  position: Position
  side: ChessSide
  piece: ChessPiece
}

/** Draggable Rook Piece */
export const DraggablePiece: React.FunctionComponent<DraggablePieceProps> = ({
  position,
  side,
  piece,
}) => {
  const { event_handlers, local } = useDraggable<DragData>({
    data: {
      piece,
      side,
      position,
    },
    type: "piece",
  })

  return useMemo(
    () => {
      return local.is_dragging ? null : (
        <Piece {...event_handlers} piece={piece} side={side} />
      )
    },
    [local.is_dragging, piece, side],
  )
}
