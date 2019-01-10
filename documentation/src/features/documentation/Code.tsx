import React from "react"
import styled from "styled-components"
import * as RSH from "react-syntax-highlighter"
import * as st from "react-syntax-highlighter/dist/styles/prism"

const SyntaxHighlighter = (RSH as any).Prism

const Container = styled.div`
  & * {
    font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  }

  & > pre {
    border-radius: 5px;
  }
`

const Code: React.FunctionComponent = ({ children }) => {
  return (
    <Container>
      <SyntaxHighlighter style={st.tomorrow} language="tsx">
        {children}
      </SyntaxHighlighter>
    </Container>
  )
}

export default Code
