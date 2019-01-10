import React from "react"
import styled from "styled-components"

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 60px;
  font-weight: 300;
  margin-top: 20px;
  margin-bottom: 10px;
`

export default Title
