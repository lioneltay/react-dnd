import React, { useState } from "react"
import styled from "styled-components"
import { Provider, useDraggable, useDropzone } from "dnd"

const Dropzone: React.FunctionComponent = ({ children }) => {
  const { event_handlers } = useDropzone({
    type: "stuff",
  })

  return (
    <div
      {...event_handlers}
      style={{
        height: "70vh",
        width: "70vw",
        background: "grey",
        borderRadius: 5,
      }}
    >
      {children}
    </div>
  )
}

const Ball = styled.div.attrs({ className: "fas fa-circle" })`
  font-size: 50px;
  color: lightgreen;
`

const DraggableBall: React.FunctionComponent = () => {
  const [[translate_x, translate_y], setTranslation] = useState([0, 0])

  const {
    event_handlers,
    local: { is_dragging },
  } = useDraggable({
    type: "stuff",
    onDragEnd: ({ pointer, dropped, dropzone, drag_item_info }) => {
      if (dropped && dropzone) {
        setTranslation([
          dropzone.pointer.relative_x - drag_item_info.offset_x,
          dropzone.pointer.relative_y - drag_item_info.offset_y,
        ])
      }
    },
  })

  return !is_dragging ? (
    <Ball
      {...event_handlers}
      style={{
        cursor: "pointer",
        transform: `translate(${translate_x}px, ${translate_y}px)`,
      }}
    />
  ) : null
}

const DragAroundDemo: React.FunctionComponent = () => {
  return (
    <Provider renderDraggingItem={({}) => <Ball />}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Drag Around Demo</h1>

        <Dropzone>
          <DraggableBall />
        </Dropzone>
      </div>
    </Provider>
  )
}

export default DragAroundDemo
