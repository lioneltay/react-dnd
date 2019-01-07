import * as React from "react"
import { render } from "react-testing-library"
import DemoComponent from "./DemoComponent"

test("", () => {
  const { container, getByText } = render(<DemoComponent />)

  const inc_button = getByText("+")
  const dec_button = getByText("-")
  const h1 = container.querySelector("h1")

  expect(h1).not.toBeNull()
  if (!h1) {
    return
  }

  expect(h1.innerHTML).toContain("0")
  inc_button.click()
  expect(h1.innerHTML).toContain("1")
  inc_button.click()
  expect(h1.innerHTML).toContain("2")
  dec_button.click()
  expect(h1.innerHTML).toContain("1")
})
