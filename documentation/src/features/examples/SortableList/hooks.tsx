import React, { useState } from "react"
import styled from "styled-components"
import { Provider, useDraggable, useDropzone } from "@tekktekk/react-dnd"

const ITEMS = [
  { label: "Item 1", color: "rgba(109, 211, 206, 1)" },
  { label: "Item 2", color: "rgba(200, 233, 160, 1)" },
  { label: "Item 3", color: "rgba(247, 162, 120, 1)" },
  { label: "Item 4", color: "rgba(161, 61, 99, 1)" },
  { label: "Item 5", color: "rgba(53, 30, 41, 1)" },
]

const ItemDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 25px;
  height: 80px;
  width: 300px;
  border-radius: 15px;
  margin: 10px;
  user-select: none;
`

type DraggableItemProps = {
  color: string
  label: string
  position: number
  reorderItems: (from: number, to: number) => void
}

/** Must have separate wrapper since you cannot call a hook a variable number of times */
const DraggableItem: React.FunctionComponent<DraggableItemProps> = ({
  color,
  label,
  position,
  reorderItems,
}) => {
  const {
    event_handlers: drag_handlers,
    state: { data },
  } = useDraggable({
    type: "item",
    data: { color, label, position },
  })

  type Data = { position: number }
  const { event_handlers: drop_handlers } = useDropzone<Data>({
    type: "item",
    onDragEnter: ({ data, updateData }) => {
      if (data.position !== position) {
        reorderItems(data.position, position)
        updateData({ ...data, position })
      }
    },
  })

  return (
    <ItemDisplay
      {...drag_handlers(drop_handlers())}
      style={{
        backgroundColor: color,
        opacity: data && position === data.position ? 0.5 : 1,
      }}
    >
      {label}
    </ItemDisplay>
  )
}

const SortableList: React.FunctionComponent = () => {
  const [items, setItems] = useState(ITEMS)

  return (
    <Provider
      renderDraggingItem={({ data }) => (
        <ItemDisplay style={{ backgroundColor: data.color }}>
          {data.label}
        </ItemDisplay>
      )}
    >
      {items.map((item, index) => (
        <DraggableItem
          key={item.label}
          reorderItems={(from, to) =>
            setItems(items => {
              const new_items = [...items]
              new_items.splice(to, 0, ...new_items.splice(from, 1))
              return new_items
            })
          }
          color={item.color}
          label={item.label}
          position={index}
        />
      ))}
    </Provider>
  )
}

export default SortableList
