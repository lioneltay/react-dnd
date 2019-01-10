import React from "react"
import styled from "styled-components"
import { Route, Switch, Link, Redirect } from "react-router-dom"

import UseDraggablePage from "./useDraggable"
import UseDropzonePage from "./useDropzone"
import ProviderPage from "./Provider"
import DraggablePage from "./Draggable"
import DropzonePage from "./Dropzone"

const APIPage: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/api/useDraggable" component={UseDraggablePage} />
      <Route path="/api/useDropzone" component={UseDropzonePage} />
      <Route path="/api/Provider" component={ProviderPage} />
      <Route path="/api/Draggable" component={DraggablePage} />
      <Route path="/api/Dropzone" component={DropzonePage} />
      <Route render={() => <Redirect to="/api/useDraggable" />} />
    </Switch>
  )
}

export default APIPage
