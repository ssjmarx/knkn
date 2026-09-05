import Phaser from "phaser"
import type { Point2 } from "./trail"

const STOP_RADIUS = 1 // px
const GAIN = 16 // how hard the fox steers toward its target
const SPRITE_Y_OFFSET = 6

export class Fox {
  readonly sprite: Phaser.Physics.Arcade.Sprite

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, "fox")
    this.sprite.play("fox-idle")
  }

  chase(target: Point2 | undefined, speed: number): void {
    if (!target) {
      this.sprite.setVelocity(0, 0)
      return
    }

    const dx = target.x - this.sprite.x
    const dy = (target.y - SPRITE_Y_OFFSET) - this.sprite.y
    const dist = Math.hypot(dx, dy)

    if (dist < STOP_RADIUS) {
      this.sprite.setVelocity(0, 0)
      return
    }

    const step = Math.min(speed, dist * GAIN)
    this.sprite.setVelocity(
      (dx / dist) * step,
      (dy / dist) * step
    )
  }
}