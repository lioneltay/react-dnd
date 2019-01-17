import React from "react"
import styled from "styled-components"
import { useDraggable, useDropzone } from "@tekktekk/react-dnd"
import { equals } from "ramda"

export const ItemDisplay = styled.div`
  height: 80px;
  border: 1px solid lightgreen;
  user-select: none;
`

type ItemProps = {
  id: number
  color: string
  label: string
  position: number
  list_position: number
  moveItem: (from: [number, number], to: [number, number]) => void
}

const Item: React.FunctionComponent<ItemProps> = ({
  label,
  moveItem,
  position,
  list_position,
  color,
}) => {
  const {
    event_handlers: drag_handlers,
    state: { data },
  } = useDraggable({
    type: "item",
    data: { position: [list_position, position] },
    renderDraggingItem: () => (
      <ItemDisplay style={{ backgroundColor: color }}>{label}</ItemDisplay>
    ),
  })

  const { event_handlers: drop_handlers } = useDropzone({
    type: "item",
    onDragEnter: ({ data, type, updateData }) => {
      if (
        type === "item" &&
        !equals(data.position, [list_position, position])
      ) {
        moveItem(data.position, [list_position, position])
        updateData({ position: [list_position, position] })
      }
    },
  })

  return (
    <ItemDisplay
      {...drop_handlers(drag_handlers())}
      style={{
        backgroundColor: color,
        opacity:
          data && equals([list_position, position], data.position) ? 0.5 : 1,
      }}
    >
      {label}
    </ItemDisplay>
  )
}

export default Item
