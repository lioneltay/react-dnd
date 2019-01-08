import React, { Component } from "react"
import Demo from "./Demo"
import { Provider } from "dnd"

export default class App extends Component {
  render() {
    return (
      <Provider>
        <div>
          <h1>Demo</h1>

          <Demo />
        </div>
      </Provider>
    )
  }
}
