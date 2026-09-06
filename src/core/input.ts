/**
 * The input abstraction for the whole game — one contract, three sources, one composite.
 * Defines the Button/Action/Direction unions, KeyboardInput, and the shared guards and axis helper.
 * Every scene reads player intent through this module; nothing else touches raw keys or DOM.
 */
export type Direction = "down" | "left" | "right" | "up"
export type Action = "a" | "b" | "start" | "select"
export type Button = Action | Direction

export interface InputSource {
  readonly x: number
  readonly y: number
  isDown(button: Button): boolean
  justPressed(button: Button): boolean
  endFrame(): void
}

/** Turns two held-direction booleans into a −1/0/1 axis value. */
export function axis(negative: boolean, positive: boolean): number {
  if (negative && positive) return 0
  if (negative) return -1
  if (positive) return 1
  return 0
}

/** Runtime guard: narrows an unknown DOM string to Action. */
export function isAction(value: unknown): value is Action {
  return value === "a" || value === "b" || value === "start" || value === "select"
}

/** Runtime guard: narrows an unknown DOM string to Direction. */
export function isDirection(value: unknown): value is Direction {
  return value === "down" || value === "left" || value === "right" || value === "up"
}