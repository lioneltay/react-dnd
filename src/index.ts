export { default as DemoComponent } from "./DemoComponent"

export function randomInt(lower: number, upper: number): number {
  return lower + Math.floor(Math.random() * (upper - lower))
}
