import React, { Component } from "react"
import styled from "styled-components"
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom"

import DevDemo from "./Dev"
import ChessKnightDemo from "./ChessKnight"

import { hot } from "react-hot-loader"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/dev" component={DevDemo} />
          <Route path="/chess-knight" component={ChessKnightDemo} />
          <Route
            render={() => (
              <div>
                <h1>Demo</h1>
                <Container>
                  <Link to="/dev">Dev Demo</Link>
                  <Link to="/chess-knight">Chess Knight Demo</Link>
                </Container>
              </div>
            )}
          />
        </Switch>
      </Router>
    )
  }
}

export default hot(module)(App)
