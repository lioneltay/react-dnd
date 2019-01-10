import React from "react"
import styled from "styled-components"
import { Provider } from "./context"
import ChessBoard from "./ChessBoard"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ChessKnightDemo: React.FunctionComponent = () => {
  return (
    <Provider>
      <Container>
        <ChessBoard />
      </Container>
    </Provider>
  )
}

export default ChessKnightDemo
