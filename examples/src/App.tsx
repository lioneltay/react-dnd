import React, { Component } from "react"
import { randomInt, DemoComponent } from "mymodule"

class App extends Component {
  render() {
    return (
      <div>
        <DemoComponent />
        <div>Random Number: {randomInt(5, 10)}</div>
      </div>
    )
  }
}

export default App
