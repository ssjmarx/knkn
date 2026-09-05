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

  get x(): number {
    return axis(this.keys.left.isDown, this.keys.right.isDown)
  }

  get y(): number {
    return axis(this.keys.up.isDown, this.keys.down.isDown)
  }

  isDown(button: Button): boolean {
    return this.keys[button].isDown
  }

  justPressed(button: Button): boolean {
    return Phaser.Input.Keyboard.JustDown(this.keys[button])
  }

  endFrame(): void {}
}

export function axis(negative: boolean, positive: boolean): number {
  if (negative && positive) return 0
  if (negative) return -1
  if (positive) return 1
  return 0
}

export function isAction(value: unknown): value is Action {
  return value === "a" || value === "b" || value === "start" || value === "select"
}

export function isDirection(value: unknown): value is Direction {
  return value === "down" || value === "left" || value === "right" || value === "up"
}