import React, { Fragment } from "react"
import { createGlobalStyle } from "styled-components"

const GeneralStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

`

export default () => (
  <Fragment>
    <GeneralStyles />
  </Fragment>
)
