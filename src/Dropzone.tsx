import React from "react"
import {
  useDropzone,
  UseDropzoneOptions,
  UseDropzoneResult,
} from "./useDropzone"

type Props = UseDropzoneOptions & {
  children: (info: UseDropzoneResult) => React.ReactElement<unknown> | null
}

export const Dropzone: React.FunctionComponent<Props> = ({
  children,
  ...use_dropzone_props
}) => {
  return children(useDropzone(use_dropzone_props))
}
