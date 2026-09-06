/**
 * The player actor — an arcade sprite driven straight from an InputSource and can be halted for dialogue.
 * Applies axis velocity with diagonal normalization swaps walk/stand frames based on facing, and answers the front-tile probe for NPC talks.
 * GameScene spawns it and calls move() every frame with the composite controls.
 */
import type { Direction, InputSource } from "../core/input"
import Phaser from "phaser"
import { TILE_SIZE } from "../config"
import { SHEET_COLUMNS, ROW_INDEX } from "./pcsheet"

const STAND_COLUMN = 1 // column of sprite sheet with standing pose
const PROBE_INSET = 2 // how far the probe reaches back into the player's own body

/** The player sprite plus its facing state and frame math. */
export class Player {
  readonly sprite: Phaser.Physics.Arcade.Sprite
  private _facing: Direction = "down"

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, "pc")
    this.sprite.setFrame(STAND_COLUMN)

    this.sprite.body?.setSize(16, 16)
    this.sprite.body?.setOffset(0, 4)
  }

  /** The direction the player currently faces. */
  get facing(): Direction {
    return this._facing
  }

  /** Applies the input axes as velocity and picks the walk or stand animation. */
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

  /** Records the dominant direction of motion as the new facing. */
  private setFacing(vx: number, vy: number): void {
    if (vx < 0) {
      this._facing = "left"
    } else if (vx > 0) {
      this._facing = "right"
    } else if (vy < 0) {
      this._facing = "up"
    } else {
      this._facing = "down"
    }
  }

  /** The tile's worth of space immediately ahead of the body, in the current facing. */
  frontTile(): Phaser.Geom.Rectangle {
    const body = this.sprite.body!
    const ahead = {
      down: new Phaser.Geom.Rectangle(body.left, body.bottom - PROBE_INSET, TILE_SIZE, TILE_SIZE + PROBE_INSET),
      up: new Phaser.Geom.Rectangle(body.left, body.top - TILE_SIZE, TILE_SIZE, TILE_SIZE + PROBE_INSET),
      right: new Phaser.Geom.Rectangle(body.right - PROBE_INSET, body.top, TILE_SIZE + PROBE_INSET, TILE_SIZE),
      left: new Phaser.Geom.Rectangle(body.left - TILE_SIZE, body.top, TILE_SIZE + PROBE_INSET, TILE_SIZE)
    } satisfies Record<Direction, Phaser.Geom.Rectangle>
    return ahead[this.facing]
  }

  /** The standing-pose frame index for the current facing. */
  private standFrame(): number {
    return ROW_INDEX[this._facing] * SHEET_COLUMNS + STAND_COLUMN
  }

  /** Stops the player dead: velocity zeroed, walk animation halted, stand frame shown. */
  halt(): void {
    this.sprite.setVelocity(0, 0)
    this.sprite.stop()
    this.sprite.setFrame(this.standFrame())
  }
}