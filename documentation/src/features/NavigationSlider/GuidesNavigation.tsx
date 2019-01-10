import React from "react"
import styled from "styled-components"

import { Title, NavItem } from "./components"

const Container = styled.div``

const GuidesNavigation: React.FunctionComponent = () => {
  return (
    <Container>
      <Title>Guides</Title>

      <NavItem to="/guides/quick-start">Quick Start</NavItem>
    </Container>
  )
}

export default GuidesNavigation
