import React, { useState } from "react"
import styled from "styled-components"
import { Provider } from "@tekktekk/react-dnd"

import { moveItem, moveList } from "./utils"
import List from "./List"

import { DATA } from "./data"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  border: 1px solid black;
  min-height: 70vh;
`

const KanbanBoardExample: React.FunctionComponent = () => {
  const [kanban_board, setKanbanBoard] = useState(DATA)

  return (
    <Provider
      renderDraggingItem={() =>
        "There is no renderer at the useDraggable level!"
      }
    >
      <Container>
        {kanban_board.map((list, index) => (
          <List
            key={list.id}
            {...list}
            position={index}
            moveList={(from, to) =>
              setKanbanBoard(board => moveList(board, from, to))
            }
            moveItem={(from, to) =>
              setKanbanBoard(board => moveItem(board, from, to))
            }
          />
        ))}
      </Container>
    </Provider>
  )
}

export default KanbanBoardExample
