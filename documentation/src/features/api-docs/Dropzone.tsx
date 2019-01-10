import React from "react"
import styled from "styled-components"
import javascript from "tagged-template-noop"

import Title from "features/documentation/Title"
import Body from "features/documentation/Body"
import Highlight from "features/documentation/Highlight"
import InlineCode from "features/documentation/InlineCode"
import Code from "features/documentation/Code"

const DropzonePage: React.FunctionComponent = () => {
  return (
    <div>
      <Title>{"<Dropzone />"}</Title>
      <Body>
        A render props version of <InlineCode>useDropzone()</InlineCode>.
        <Code>
          {`
type Props = DraggableOptions<any> & {
  children: (info: DraggableResult) => React.ReactElement<any> | null
}

export const Draggable: React.FunctionComponent<Props> = ({
  children,
  ...use_draggable_props
}) => {
  return children(useDraggable(use_draggable_props))
}
        `}
        </Code>
        Hooks are usually nicer to use as they allow you to write flatter jsx
        trees. However, if you want to render a variable list of items you
        cannot use hooks sinces the number of hook calls must be the same during
        each render. In that case the render props version may be of use.
      </Body>
    </div>
  )
}

export default DropzonePage
