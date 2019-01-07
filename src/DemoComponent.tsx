import * as React from "react"
import { useState } from "react"

const DemoComponent: React.FunctionComponent = () => {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>DemoComponent {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <button onClick={() => setCount(c => c - 1)}>-</button>
    </div>
  )
}

export default DemoComponent
