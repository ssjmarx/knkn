import type { InputSource } from "./input"

const STAND_COLUMN = 1 // column of sprite sheet with standing pose
const SHEET_COLUMNS = 9 // total columns in sprite sheet

export class Player {
  readonly sprite: Phaser.Physics.Arcade.Sprite
  private facing = "down"

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, "pc")
    this.sprite.setFrame(STAND_COLUMN)

    this.sprite.body?.setSize(16, 16)
    this.sprite.body?.setOffset(0, 4)
  }

  move(input: InputSource, speed: number): void {
    let vx = input.x
    let vy = input.y

    if (vx !== 0 && vy !== 0) {
      vx *= Math.SQRT1_2
      vy *= Math.SQRT1_2
    }

    this.sprite.setVelocityX(vx * speed)
    this.sprite.setVelocityY(vy * speed)

    if (vx !== 0 || vy !== 0) {
      this.setFacing(vx, vy)
      this.sprite.play(`pc-walk-${this.facing}`, true)
    } else {
      this.sprite.setFrame(this.standFrame())
    }
  }

  private setFacing(vx: number, vy: number): void {
    if (vx < 0) {
      this.facing = "left"
    } else if (vx > 0) {
      this.facing = "right"
    } else if (vy < 0) {
      this.facing = "up"
    } else {
      this.facing = "down"
    }
  }

  private standFrame(): number {
    const rowIndex = { down: 0, left: 1, right: 2, up: 3 }[this.facing] ?? 0
    return rowIndex * SHEET_COLUMNS + STAND_COLUMN
  }
}