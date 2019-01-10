import React from "react"
import styled from "styled-components"

const Body = styled.span`
  color: white;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 5px;
  padding: 4px 6px;
`

export default Body
