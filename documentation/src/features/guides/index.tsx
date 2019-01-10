import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"

import QuickStartPage from "./QuickStart"

const GuidesPage: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route path="/guides/quick-start" component={QuickStartPage} />
      <Route render={() => <Redirect to="/guides/quick-start" />} />
    </Switch>
  )
}

export default GuidesPage
