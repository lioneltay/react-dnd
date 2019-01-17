import React, { useState } from "react"
import { useDropzone } from "@tekktekk/react-dnd"

type BinProps = {
  type: string | string[]
  label: string
  icon: string
  background: string
}

export const Bin: React.FunctionComponent<BinProps> = ({
  label,
  icon,
  type,
  background,
}) => {
  const [drops, setDrops] = useState(0)

  const { event_handlers, can_drop, is_dragging } = useDropzone({
    type,
    onDrop: () => setDrops(d => d + 1),
  })

  return (
    <div
      {...event_handlers()}
      style={{
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: 20,
        padding: 10,
        borderRadius: 5,
        transform: `scale(${can_drop ? 1.15 : is_dragging ? 0.9 : 1})`,
        transition: "503ms",
        backgroundColor: can_drop
          ? "lightgreen"
          : is_dragging
          ? "grey"
          : background,
      }}
    >
      <i className={icon} style={{ fontSize: 70 }} />
      <div>{label}</div>
      <div>Drops: {drops}</div>
    </div>
  )
}
