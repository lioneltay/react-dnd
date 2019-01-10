import React from "react"
import { ThemeProvider as TP } from "styled-components"

const theme = {
  colors: {
    primary: "#0080FF",
  },
}

const ThemeProvider: React.FunctionComponent = ({ children }) => (
  <TP theme={theme}>{children as any}</TP>
)

export default ThemeProvider
