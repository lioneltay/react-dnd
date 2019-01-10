import React, { useContext } from "react"
import styled from "styled-components"

import { Context } from "./context"

import { Provider as DnDProvider } from "@tekktekk/react-dnd"

import Tile from "./Tile"
import { KnightDisplay } from "./Knight"

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 50px);
  grid-template-rows: repeat(8, 50px);
  border: 25px solid #1a1b16;
`

const ChessBoard: React.FunctionComponent = () => {
  const { board } = useContext(Context)

  return (
    <DnDProvider renderDraggingItem={() => <KnightDisplay />}>
      <Board>
        {board.map((row, row_index: number) =>
          row.map((tile: any, col_index: number) => (
            <Tile
              key={`${row_index}:${col_index}`}
              position={[row_index, col_index]}
              {...tile}
            />
          )),
        )}
      </Board>
    </DnDProvider>
  )
}

export default ChessBoard
