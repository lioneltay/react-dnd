import React from "react"
import styled from "styled-components"
import { Route, Switch, Link, Redirect } from "react-router-dom"

import UseDraggablePage from "./useDraggable"
import UseDropzonePage from "./useDropzone"
import ProviderPage from "./Provider"

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const APIPage: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/api/useDraggable" component={UseDraggablePage} />
      <Route path="/api/useDropzone" component={UseDropzonePage} />
      <Route path="/api/Provider" component={ProviderPage} />
      <Route render={() => <Redirect to="/api/useDraggable" />} />
    </Switch>
  )
}

export default APIPage
