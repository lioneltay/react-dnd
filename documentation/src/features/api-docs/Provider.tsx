import React from "react"
import styled from "styled-components"
import javascript from "tagged-template-noop"

import Title from "features/documentation/Title"
import Body from "features/documentation/Body"
import Highlight from "features/documentation/Highlight"
import InlineCode from "features/documentation/InlineCode"
import Code from "features/documentation/Code"

const ProviderPage: React.FunctionComponent = () => {
  return (
    <div>
      <Title>{"<Provider />"}</Title>
      <Body>Top level context provider which stores the drag state.</Body>

      <Code>
        {`
<Provider>
  {children using drag state}
</Provider>
        `}
      </Code>

      <Title>Props</Title>
      <Code>
        {`
type ProviderProps = {
  /**
   * What to render under the cursor while dragging.
   * The render item will automatically be placed in a container the same size as the item that is currently being dragged
   */
  renderDraggingItem?: (info: RenderPreviewInput) => React.ReactNode
  /** Defaults to 1000, can be customised. Just to ensure that the cursor item appears above other items */
  dragging_item_z_index?: number
}
        `}
      </Code>
    </div>
  )
}

export default ProviderPage
