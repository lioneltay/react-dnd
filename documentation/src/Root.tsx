import React from "react"
import { BrowserRouter, HashRouter } from "react-router-dom"
import App from "./App"

import { Provider as StoreProvider } from "store"
import ThemeProvider from "./styles/ThemeProvider"
import { hot } from "react-hot-loader"

const Router: React.FunctionComponent = ({ children }) =>
  process.env.APP_MODE === "production" ? (
    <HashRouter>{children}</HashRouter>
  ) : (
    <BrowserRouter>{children}</BrowserRouter>
  )

const Root = () => {
  return (
    <Router>
      <StoreProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </StoreProvider>
    </Router>
  )
}

export default hot(module)(Root)
