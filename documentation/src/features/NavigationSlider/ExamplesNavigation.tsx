import React from "react"
import styled from "styled-components"

import { Title, NavItem } from "./components"

const Container = styled.div``

const ExamplesNavigation: React.FunctionComponent = () => {
  return (
    <Container>
      <Title>Examples</Title>

      <NavItem to="/examples/chess">Chess</NavItem>
      <NavItem to="/examples/chess-knight">Chess Knight</NavItem>
      <NavItem to="/examples/drag-types">Drag Types</NavItem>
      <NavItem to="/examples/drag-around">Drag Around</NavItem>
      <NavItem to="/examples/sortable-list">Sortable List</NavItem>
    </Container>
  )
}

export default ExamplesNavigation
