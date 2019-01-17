import React from "react"
import styled from "styled-components"
import { useDraggable, useDropzone } from "@tekktekk/react-dnd"
import { equals } from "ramda"

import { Item as ItemType } from "./types"
import Item, { ItemDisplay } from "./Item"

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
  const {
    event_handlers: drag_handlers,
    state: { data },
  } = useDraggable({
    type: "list",
    data: { position },
    renderDraggingItem: () => (
      <ListDisplay {...drag_handlers} {...drop_handlers}>
        <div>{label}</div>

        {items.map((item, index) => (
          <ItemDisplay style={{ backgroundColor: item.color }}>
            {item.label}
          </ItemDisplay>
        ))}
      </ListDisplay>
    ),
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
      if (type === "item") {
        moveItem(data.position, [position, 0])
      }
    },
  })

  return (
    <ListDisplay
      {...drag_handlers(drop_handlers())}
      style={{ opacity: data && equals(data.position, position) ? 0.5 : 1 }}
    >
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
