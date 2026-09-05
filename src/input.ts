export interface InputSource {
  readonly x: number
  readonly y: number
}

import type Phaser from "phaser"

export class KeyboardInput implements InputSource {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(scene: Phaser.Scene) {
    this.cursors = scene.input.keyboard!.createCursorKeys()
  }

  get x(): number {
    return axis(this.cursors.left.isDown, this.cursors.right.isDown)
  }

  get y(): number {
    return axis(this.cursors.up.isDown, this.cursors.down.isDown)
  }
}

function axis(negative: boolean, positive: boolean): number {
  if (negative && positive) return 0
  if (negative) return -1
  if (positive) return 1
  return 0
}
