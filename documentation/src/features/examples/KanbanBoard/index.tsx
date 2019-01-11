import React, { useState } from "react"
import styled from "styled-components"
import { Provider } from "@tekktekk/react-dnd"

import { move, update, insert, remove } from "./utils"
import List from "./List"

import { DATA } from "./data"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  border: 1px solid black;
`

const KanbanBoardExample: React.FunctionComponent = () => {
  const [kanban_board, setKanbanBoard] = useState(DATA)

  return (
    <Provider>
      <Container>
        {kanban_board.map((list, index) => (
          <List
            key={list.id}
            {...list}
            position={index}
            moveList={(from, to) =>
              setKanbanBoard(lists => move(from, to, lists))
            }
            moveItem={([from_list, from_item], [to_list, to_item]) => {
              setKanbanBoard(lists => {
                // Dragging/dropping in same list
                if (from_list === to_list) {
                  return update(
                    from_list,
                    {
                      ...lists[from_list],
                      items: move(from_item, to_item, lists[from_list].items),
                    },
                    lists,
                  )
                }

                // From anothere list
                const item = lists[from_list].items[from_item]

                const removed = update(
                  from_list,
                  {
                    ...lists[from_list],
                    items: remove(from_item, lists[from_list].items),
                  },
                  lists,
                )

                const added = update(
                  to_list,
                  {
                    ...removed[to_list],
                    items: insert(to_item, item, removed[to_list].items),
                  },
                  removed,
                )

                return added
              })
            }}
          />
        ))}
      </Container>
    </Provider>
  )
}

export default KanbanBoardExample
