import React from "react"
import styled from "styled-components"
import javascript from "tagged-template-noop"

import Title from "features/documentation/Title"
import Body from "features/documentation/Body"
import Highlight from "features/documentation/Highlight"
import InlineCode from "features/documentation/InlineCode"
import Code from "features/documentation/Code"

const UseDraggablePage: React.FunctionComponent = () => {
  return (
    <div>
      <Title>useDraggable()</Title>
      <Body>
        <Highlight>Highlighted Text</Highlight>, consectetur adipiscing elit.
        Etiam bla mass nunc id nulla suspendisse feugiat flying cat monkey{" "}
        <InlineCode>
          useDraggable(config: UseDraggableConfig) => UseDraggableResult
        </InlineCode>
        , posuere in massa vel, porttitor tincidunt massa. Duis id nunc eget
        risus tincidunt elementum non ut nibh. Etiam cursus, risus et porta
        facilisis, odio turpis consequat nunc, et mollis massa mi ut lorem.
        Maecenas mi eros, suscipit sed consectetur vitae, ultricies ut erat. Sed
        sagittis pharetra suscipit. Phasellus dapibus erat odio, nec feugiat
        turpis bibendum in. Suspendisse est arcu, feugiat sit amet ullamcorper
        in, fringilla non massa. Sed condimentum ac ipsum at rhoncus. Donec nec
        maximus velit. Aliquam fermentum, sem eu facilisis molestie, orci mi
        semper mauris, sed maximus tellus tortor vitae leo. Vestibulum in
        condimentum tortor, quis laoreet libero. Fusce nec risus tellus. Cras ac
        vehicula justo. Cras vitae nibh mollis, scelerisque sem non, malesuada
        lectus. Nulla auctor dolor diam, ut ultricies dolor ullamcorper in. Nam
        in eros et ipsum vestibulum ultrices et ac nunc. Vestibulum rutrum
        finibus ligula, eu auctor erat egestas ut. Vivamus dapibus felis in diam
        lacinia iaculis. Praesent nec turpis tincidunt, dapibus nunc id,
        consectetur orci. Integer ut diam vestibulum, vehicula ex eu, egestas
        risus. Aenean dignissim aliquet erat a dictum. Phasellus quis tortor
        congue, consectetur dui eget, condimentum tortor. Suspendisse vel nulla
        ac est malesuada ultrices at a ipsum. Vestibulum ultricies justo nisl,
        at convallis metus scelerisque sed. In porttitor dictum elit vitae
        convallis. Donec varius aliquet mi vitae fringilla. Maecenas auctor
        neque magna. Suspendisse feugiat vehicula quam, nec mattis orci
        consequat id. Mauris et purus nisl. Nunc id ex augue.
      </Body>

      <Title id="props">Props</Title>
      <Code>
        {javascript`
import React from "react"
import styled from "styled-components"
import SyntaxHighlighter from "react-syntax-highlighter/prism"

const Code: React.FunctionComponent = ({ children }) => {
  return <SyntaxHighlighter language="tsx">{children}</SyntaxHighlighter>
}

export default Code
        `}
      </Code>
    </div>
  )
}

export default UseDraggablePage
