import { useContext } from "react"
import { Context } from "./context"

export const useReader = () => {
  const context = useContext(Context)
  return context.state
}
