import React, { useState } from "react"
import styled from "styled-components"
import { Provider, Dropzone, Draggable } from "@tekktekk/react-dnd"

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

function move<T>(from: number, to: number, arr: T[]): T[] {
  const items = [...arr]
  items.splice(to, 0, items.splice(from, 1)[0])
  return items
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {items.map((item, index) => (
          <Dropzone
            key={item.label}
            type="item"
            onDragEnter={({ data, updateData }) => {
              if (data.index !== index) {
                setItems(items => move(data.index, index, items))
                updateData({ ...data, index })
              }
            }}
          >
            {({ event_handlers: drop_handlers }) => (
              <Draggable type="item" data={{ ...item, index }}>
                {({
                  event_handlers: drag_handlers,
                  local: { is_dragging },
                }) => (
                  <ItemDisplay
                    {...drop_handlers}
                    {...drag_handlers}
                    style={{
                      backgroundColor: item.color,
                      opacity: is_dragging ? 0.5 : 1,
                    }}
                  >
                    {item.label}
                  </ItemDisplay>
                )}
              </Draggable>
            )}
          </Dropzone>
        ))}
      </div>
    </Provider>
  )
}

export default SortableList
