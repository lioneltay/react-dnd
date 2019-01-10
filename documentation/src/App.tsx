import React from "react"
import styled from "styled-components"
import { Route, Switch, Redirect } from "react-router-dom"

import { Media } from "lib/components"

import GlobalStyles from "styles/GlobalStyles"
import Header from "./features/Header"
import NavigationSlider from "./features/NavigationSlider"

import ExamplesPage from "./features/examples"
import APIPage from "./features/api-docs"
import GuidesPage from "./features/guides"

const Container = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-gap: 20px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`

const Content = styled.div`
  justify-self: center;
  max-width: 800px;
  width: 100%;
  padding: 30px;
`

const App = () => {
  return (
    <div>
      <GlobalStyles />

      <Header />

      <Container>
        <NavigationSlider />

        <Content>
          <Switch>
            <Route path="/examples" component={ExamplesPage} />
            <Route path="/api" component={APIPage} />
            <Route path="/guides" component={GuidesPage} />
            <Route render={() => <Redirect to="/api" />} />
          </Switch>
        </Content>
      </Container>
    </div>
  )
}

export default App
