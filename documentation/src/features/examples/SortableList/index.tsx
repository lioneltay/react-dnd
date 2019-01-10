import React, { useState, forwardRef } from "react"
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

type ItemProps = {
  style?: React.CSSProperties
  label: string
  color: string
}

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, color, style, ...rest }, ref) => {
    return (
      <ItemDisplay {...rest} ref={ref} style={{ ...style, background: color }}>
        {label}
      </ItemDisplay>
    )
  },
)

type DraggableItemProps = ItemProps & {
  position: number
}

const DraggableItem: React.FunctionComponent<DraggableItemProps> = ({
  color,
  label,
  position,
}) => {
  const {
    event_handlers,
    local: { is_dragging },
  } = useDraggable({
    type: "item",
    data: { color, label, position },
  })

  return (
    <Item
      {...event_handlers}
      color={color}
      label={label}
      style={{ opacity: is_dragging ? 0.5 : 1 }}
    />
  )
}

type DropContainerProps = {
  reorderItems: (from: number, to: number) => void
  position: number
}

const DropContainer: React.FunctionComponent<DropContainerProps> = ({
  children,
  position,
  reorderItems,
}) => {
  const { event_handlers } = useDropzone({
    type: "item",
    onDragEnter: ({ data, updateData }) => {
      if (data.position !== position) {
        reorderItems(data.position, position)
        updateData({ ...data, position })
      }
    },
  })

  return <div {...event_handlers}>{children}</div>
}

const SortableList: React.FunctionComponent = () => {
  const [items, setItems] = useState(ITEMS)

  return (
    <Provider renderDraggingItem={({ data }) => <Item {...data} />}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {items.map((item, index) => (
          <DropContainer
            key={item.label}
            position={index}
            reorderItems={(from, to) =>
              setItems(items => {
                const new_items = [...items]
                new_items.splice(to, 0, ...new_items.splice(from, 1))
                return new_items
              })
            }
          >
            <DraggableItem
              color={item.color}
              label={item.label}
              position={index}
            />
          </DropContainer>
        ))}
      </div>
    </Provider>
  )
}

export default SortableList
