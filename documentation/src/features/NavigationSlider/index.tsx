import React, { Fragment, useContext } from "react"
import styled from "styled-components"
import { Route, Switch } from "react-router-dom"
import { StoreContext } from "store"

import APINavigation from "./APINavigation"
import GuidesNavigation from "./GuidesNavigation"
import ExamplesNavigation from "./ExamplesNavigation"

import { HEADER_HEIGHT } from "features/Header"

import { Media, Drawer } from "lib/components"

const Container = styled.div`
  position: fixed;
  top: ${HEADER_HEIGHT}px;
  left: 0;
  max-height: calc(100vh - ${HEADER_HEIGHT}px);
  overflow-y: auto;
  padding: 30px;
`

const Placeholder = styled.div``

const NavigationSlider: React.FunctionComponent = () => {
  const element = (
    <Switch>
      <Route path="/api" component={APINavigation} />
      <Route path="/guides" component={GuidesNavigation} />
      <Route path="/examples" component={ExamplesNavigation} />
    </Switch>
  )

  const {
    state: { navigation_open },
    actions: { setNavigationOpen },
  } = useContext(StoreContext)

  return (
    <Media query="(min-width: 1100px)">
      {({ matches }) =>
        matches ? (
          <Fragment>
            <Placeholder />
            <Container>{element}</Container>
          </Fragment>
        ) : (
          <Drawer
            style={{ padding: 30, width: 250, maxWidth: "100vw" }}
            open={navigation_open}
            onClose={() => setNavigationOpen(false)}
          >
            {element}
          </Drawer>
        )
      }
    </Media>
  )
}

export default NavigationSlider
