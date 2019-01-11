import React from "react"
import styled from "styled-components"
import { useDraggable, useDropzone } from "@tekktekk/react-dnd"

import { Item as ItemType } from "./types"
import Item from "./Item"

const ListDisplay = styled.div`
  border: 1px solid red;
  user-select: none;
`

type ListProps = {
  id: number
  label: string
  items: ItemType[]
  position: number
  moveList: (from: number, to: number) => void
  moveItem: (from: [number, number], to: [number, number]) => void
}

const List: React.FunctionComponent<ListProps> = ({
  id,
  label,
  items,
  position,
  moveList,
  moveItem,
}) => {
  const { event_handlers: drag_handlers } = useDraggable({
    type: "list",
    data: { position },
  })

  const { event_handlers: drop_handlers } = useDropzone({
    type: ["list", "item"],
    onDragEnter: ({ data, type, updateData }) => {
      if (type === "list" && data.position !== position) {
        moveList(data.position, position)
        updateData({ position })
      }
    },
    onDrop: ({ data, type }) => {
      console.log("drop list", data, type)
      if (type === "item") {
        moveItem(data.position, [position, 0])
      }
    },
  })

  return (
    <ListDisplay {...drag_handlers} {...drop_handlers}>
      <div>{label}</div>

      {items.map((item, index) => (
        <Item
          key={item.id}
          {...item}
          list_position={position}
          position={index}
          moveItem={moveItem}
        />
      ))}
    </ListDisplay>
  )
}

export default List
