import Phaser from "phaser"

export type Direction = "down" | "left" | "right" | "up"
export type Action = "confirm" | "cancel"

export interface InputSource {
  readonly x: number
  readonly y: number
  isDown(action: Action): boolean
  justPressed(action: Action): boolean
  endFrame(): void
}

export class KeyboardInput implements InputSource {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private confirm: Phaser.Input.Keyboard.Key
  private cancel: Phaser.Input.Keyboard.Key

  constructor(scene: Phaser.Scene) {
    const keyboard = scene.input.keyboard!
    this.cursors = keyboard.createCursorKeys()
    this.confirm = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
    this.cancel = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
  }

  get x(): number {
    return axis(this.cursors.left.isDown, this.cursors.right.isDown)
  }

  get y(): number {
    return axis(this.cursors.up.isDown, this.cursors.down.isDown)
  }

  isDown(action: Action): boolean {
    return action === "confirm" ? this.confirm.isDown : this.cancel.isDown
  }

  justPressed(action: Action): boolean {
    return Phaser.Input.Keyboard.JustDown(action === "confirm" ? this.confirm : this.cancel)
  }

  endFrame(): void {
    // Keyboard edges are consumed by JustDown itself — nothing to clear.
  }
}

function axis(negative: boolean, positive: boolean): number {
  if (negative && positive) return 0
  if (negative) return -1
  if (positive) return 1
  return 0
}
