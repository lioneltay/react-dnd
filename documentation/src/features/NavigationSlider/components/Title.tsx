import React from "react"
import styled from "styled-components"

export default styled.div`
  font-weight: 300;
  font-size: 30px;
  color: orangered;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 10px;
`
