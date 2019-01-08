import React, { Component } from "react"
import styled from "styled-components"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"
import { Provider } from "dnd"

import DevDemo from "./Dev"
import ChessKnightDemo from "./ChessKnight"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

export default class App extends Component {
  render() {
    return (
      <Router>
        <Provider>
          <Switch>
            <Route path="/dev" component={DevDemo} />
            <Route path="/chess-knight" component={ChessKnightDemo} />
            <Route
              render={() => (
                <div>
                  <h1>Demos</h1>
                  <Container>
                    <Link to="/dev">Dev Demo</Link>
                    <Link to="/chess-knight">Chess Knight Demo</Link>
                  </Container>
                </div>
              )}
            />
          </Switch>
        </Provider>
      </Router>
    )
  }
}
