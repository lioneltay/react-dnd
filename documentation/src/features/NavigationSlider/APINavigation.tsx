import React from "react"
import styled from "styled-components"

import { Title, NavItem } from "./components"

const Container = styled.div``

const APINavigation: React.FunctionComponent = () => {
  return (
    <Container>
      <Title>API</Title>

      <NavItem to="/api/useDraggable">useDraggable</NavItem>
      <NavItem to="/api/useDropzone">useDropzone</NavItem>
      <NavItem to="/api/Draggable">Draggable</NavItem>
      <NavItem to="/api/Dropzone">Dropzone</NavItem>
      <NavItem to="/api/Provider">Provider</NavItem>
    </Container>
  )
}

export default APINavigation
