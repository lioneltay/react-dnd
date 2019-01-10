import React from "react"
import { useDraggable, DraggableOptions, DraggableResult } from "./useDraggable"

type Props = DraggableOptions<any> & {
  children: (info: DraggableResult) => React.ReactElement<any> | null
}

export const Draggable: React.FunctionComponent<Props> = ({
  children,
  ...use_draggable_props
}) => {
  return children(useDraggable(use_draggable_props))
}
