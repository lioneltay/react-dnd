import React from "react"
import styled from "styled-components"
import { Route, Switch, Redirect } from "react-router-dom"

import DevDemo from "./Dev"
import ChessKnightDemo from "./ChessKnight"
import ChessGameDemo from "./ChessGame"
import DragTypesDemo from "./DragTypes"
import DragAroundDemo from "./DragAround"
import SortableListDemo from "./SortableList"

const Container = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
`

const ExamplePage: React.FunctionComponent = () => {
  return (
    <Container>
      <Switch>
        <Route path="/examples/dev" component={DevDemo} />
        <Route path="/examples/chess-knight" component={ChessKnightDemo} />
        <Route path="/examples/chess" component={ChessGameDemo} />
        <Route path="/examples/drag-types" component={DragTypesDemo} />
        <Route path="/examples/drag-around" component={DragAroundDemo} />
        <Route path="/examples/sortable-list" component={SortableListDemo} />
        <Route render={() => <Redirect to="/examples/chess" />} />
      </Switch>
    </Container>
  )
}

export default ExamplePage
