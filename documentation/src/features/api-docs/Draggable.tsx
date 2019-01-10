import React from "react"
import styled from "styled-components"
import javascript from "tagged-template-noop"

import Title from "features/documentation/Title"
import Body from "features/documentation/Body"
import Highlight from "features/documentation/Highlight"
import InlineCode from "features/documentation/InlineCode"
import Code from "features/documentation/Code"

const DraggablePage: React.FunctionComponent = () => {
  return (
    <div>
      <Title>{"<Draggable />"}</Title>
      <Body>
        A render props version of <InlineCode>useDraggable()</InlineCode>.
        <Code>
          {`
type Props = UseDropzoneOptions<any> & {
  children: (info: UseDropzoneResult) => React.ReactElement<any> | null
}

export const Dropzone: React.FunctionComponent<Props> = ({
  children,
  ...use_dropzone_props
}) => {
  return children(useDropzone(use_dropzone_props))
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

export default DraggablePage
