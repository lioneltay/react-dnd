import React from "react"
import styled from "styled-components"

import { Title, NavItem } from "./components"

const Container = styled.div``

const APINavigation: React.FunctionComponent = () => {
  return (
    <Container>
      <Title>API</Title>

      <NavItem to="/api/useDraggable">useDraggable</NavItem>
      {/* <Route
        path="/api/useDraggable"
        render={() => <Item to="/api/useDraggable#props">Props</Item>}
      /> */}

      <NavItem to="/api/useDropzone">useDropzone</NavItem>
      {/* <Route
        path="/api/useDropzone"
        render={() => <Item to="/api/useDropzone#props">Props</Item>}
      /> */}

      <NavItem to="/api/Provider">Provider</NavItem>
      {/* <Route
        path="/api/Provider"
        render={() => <Item to="/api/Provider#props">Props</Item>}
      /> */}
    </Container>
  )
}

export default APINavigation
