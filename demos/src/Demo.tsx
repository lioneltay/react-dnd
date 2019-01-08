import React, { useEffect, useState, useContext } from "react"
import { useDraggable, useDropzone, Context, Type } from "dnd"
import styled from "styled-components"

const Box = styled.div`
  height: 150px;
  width: 150px;
  background-color: tomato;
  border: 1px solid black;
  user-select: none;
`

type Item = {
  id: number
  value: string
  type: Type
}

const items = [
  { id: 1, value: "Fruit", type: "plant" },
  { id: 2, value: "Vegetable", type: "plant" },
  { id: 3, value: "Chicken", type: "meat" },
  { id: 4, value: "Steak", type: "meat" },
  { id: 5, value: "Brick", type: "material" },
  { id: 6, value: "Meat Plant", type: ["meat", "plant"] },
]

type ItemProps = {
  item: Item
}

const Item: React.FunctionComponent<ItemProps> = ({ item }) => {
  const { event_handlers } = useDraggable({
    onDragStart: () => console.log("onDragStart"),
    onDragEnd: () => console.log("onDragEnd"),
    data: item.value,
    type: item.type,
  })

  return <Box {...event_handlers}>{item.value}</Box>
}

type BasketProps = {
  type: Type
  label: string
}

const Basket: React.FunctionComponent<BasketProps> = ({ type, label }) => {
  const [drops, setDrops] = useState(0)

  const { event_handlers, hovering, can_drop } = useDropzone({
    onDrop: ({ data }) => {
      console.log('onDrop')
      setDrops(d => d + 1)
    },
    type,
  })

  return (
    <Box
      {...event_handlers}
      style={{
        backgroundColor: hovering
          ? "green"
          : can_drop
          ? "lightgreen"
          : "transparent",
      }}
    >
      {label} : {drops}
    </Box>
  )
}

const baskets = [
  { id: 1, type: "plant", label: "Plant" },
  { id: 2, type: "meat", label: "Meat" },
  { id: 3, type: ["meat", "plant"], label: "All" },
]

const Demo: React.FunctionComponent<{}> = () => {
  const context = useContext(Context)

  return (
    <div>
      <h1>Demo</h1>

      <div style={{ display: "flex", marginRight: 30 }}>
        {items.map(item => (
          <Item key={item.id} item={item} />
        ))}
      </div>

      <div style={{ display: "flex", marginTop: 100 }}>
        {baskets.map(basket => (
          <Basket key={basket.id} type={basket.type} label={basket.label} />
        ))}
      </div>

      <pre>{JSON.stringify(context, null, 2)}</pre>
    </div>
  )
}

export default Demo
