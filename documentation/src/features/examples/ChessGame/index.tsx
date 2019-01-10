import React from "react"
import styled from "styled-components"
import { Provider } from "./context"
import ChessBoard from "./ChessBoard"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ChessDemo: React.FunctionComponent = () => {
  return (
    <Provider>
      <Container>
        <i
          className="fas fa-chess"
          style={{
            fontSize: 100,
            color: "grey",
            marginBottom: 20,
            marginTop: 20,
          }}
        />
        <ChessBoard />
      </Container>
    </Provider>
  )
}

export default ChessDemo
