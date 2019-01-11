import React, { forwardRef } from "react"
import { useDraggable } from "@tekktekk/react-dnd"

type ItemProps = {
  style?: React.CSSProperties
  label: string
  icon: string
  background: string
}

export const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ style, label, icon, background, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        {...rest}
        style={{
          boxSizing: "border-box",
          color: "white",
          userSelect: "none",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: 10,
          padding: 20,
          borderRadius: 5,
          background,
          ...style,
        }}
      >
        <i className={icon} style={{ fontSize: 50 }} />
        <div>{label}</div>
      </div>
    )
  },
)

type DraggableItemProps = ItemProps & {
  type: string | string[]
}

export const DraggableItem: React.FunctionComponent<DraggableItemProps> = ({
  type,
  ...item_props
}) => {
  const {
    event_handlers,
    state: { data },
  } = useDraggable({
    type,
    data: item_props,
  })

  return (
    <Item
      {...event_handlers}
      style={{
        visibility:
          data && data.label === item_props.label ? "hidden" : "visible",
      }}
      {...item_props}
    />
  )
}
