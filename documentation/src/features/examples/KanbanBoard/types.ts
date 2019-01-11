export type Item = {
  id: number
  label: string
  color: string
}

export type List = {
  id: number
  label: string
  items: Item[]
}
