import React from "react"
import styled from "styled-components"
import {
  BrowserRouter,
  Link,
  Route,
  Switch,
  HashRouter,
} from "react-router-dom"

import DevDemo from "./Dev"
import ChessKnightDemo from "./ChessKnight"
import ChessGameDemo from "./ChessGame"
import DragTypesDemo from "./DragTypes"
import DragAroundDemo from "./DragAround"
import SortableListDemo from "./SortableList"

import { hot } from "react-hot-loader"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const Router: React.FunctionComponent = ({ children }) =>
  process.env.APP_MODE === "production" ? (
    <HashRouter>{children}</HashRouter>
  ) : (
    <BrowserRouter>{children}</BrowserRouter>
  )

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/dev" component={DevDemo} />
        <Route path="/chess-knight" component={ChessKnightDemo} />
        <Route path="/chess-game" component={ChessGameDemo} />
        <Route path="/drag-types" component={DragTypesDemo} />
        <Route path="/drag-around" component={DragAroundDemo} />
        <Route path="/sortable-list" component={SortableListDemo} />
        <Route
          render={() => (
            <div>
              <h1>Demo</h1>
              <Container>
                <Link to="/dev">Dev Sandbox</Link>
                <Link to="/chess-knight">Chess Knight Demo</Link>
                <Link to="/chess-game">Chess Game Demo</Link>
                <Link to="/drag-types">Drag Types Demo</Link>
                <Link to="/drag-around">Drag Around Demo</Link>
                <Link to="/sortable-list">Sortable List Demo</Link>
              </Container>
            </div>
          )}
        />
      </Switch>
    </Router>
  )
}

export default hot(module)(App)
