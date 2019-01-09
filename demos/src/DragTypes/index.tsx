import React from "react"
import { Provider } from "dnd"
import { ITEMS, BINS } from "./data"

import { Item, DraggableItem } from "./Item"
import { Bin } from "./Bin"

const RecycleBinDemo = () => (
  <Provider
    renderDraggingItem={({ data, dimensions: { width, height } }) => {
      return <Item {...data} style={{ width, height }} />
    }}
  >
    <div>
      <h1 style={{ textAlign: "center" }}>Drag Types Demo</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div>
          {ITEMS.map((item, i) => (
            <DraggableItem key={i} {...item} />
          ))}
        </div>

        <div>
          {BINS.map((bin, i) => (
            <Bin key={i} {...bin} />
          ))}
        </div>
      </div>
    </div>
  </Provider>
)

export default RecycleBinDemo
