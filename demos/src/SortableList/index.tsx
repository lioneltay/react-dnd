import React from "react"
import { Provider, useDraggable, useDropzone } from "dnd"

const SortableList: React.FunctionComponent = () => {
  return (
    <Provider>
      <div>
        <h1>Sortable List Demo</h1>
      </div>
    </Provider>
  )
}

export default SortableList
