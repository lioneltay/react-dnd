import React, { useState } from "react"
import styled from "styled-components"

import RenderPropsVersion from "./render-props"
import HooksVersion from "./hooks"

const Button = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  padding: 8px 16px;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 20px;
  margin-bottom: 20px;

  &:focus {
    outline: none;
  }
`

const SortableListExample: React.FunctionComponent = () => {
  const [useHooks, setUseHooks] = useState(true)

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button onClick={() => setUseHooks(v => !v)}>
        {useHooks ? "Use Render Props" : "Use Hooks"}
      </Button>
      {useHooks ? <HooksVersion /> : <RenderPropsVersion />}
    </div>
  )
}

export default SortableListExample
