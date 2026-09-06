/**
 * The input abstraction for the whole game — one contract, three sources, one composite.
 * Defines the Button/Action/Direction unions, KeyboardInput, and the shared guards and axis helper.
 * Every scene reads player intent through this module; nothing else touches raw keys or DOM.
 */
import Phaser from "phaser"

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

/** The keyboard source — one Record<Button, Key> table for the whole pad. */
export class KeyboardInput implements InputSource {
  private keys: Record<Button, Phaser.Input.Keyboard.Key>

  constructor(scene: Phaser.Scene) {
    const keyboard = scene.input.keyboard!
    this.keys = {
      up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      a: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      b: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      start: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
      select: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
    }
  }

  /** Held left/right as a horizontal axis. */
  get x(): number {
    return axis(this.keys.left.isDown, this.keys.right.isDown)
  }

  /** Held up/down as a vertical axis. */
  get y(): number {
    return axis(this.keys.up.isDown, this.keys.down.isDown)
  }

  /** Table lookup: is this button currently held? */
  isDown(button: Button): boolean {
    return this.keys[button].isDown
  }

  /** Table lookup with JustDown: pressed since last read? */
  justPressed(button: Button): boolean {
    return Phaser.Input.Keyboard.JustDown(this.keys[button])
  }

  /** Nothing to clear — JustDown consumes on read. */
  endFrame(): void {}
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