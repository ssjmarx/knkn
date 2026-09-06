/**
 * The villager actor — a static sprite standing in the world, carrying its conversation.
 * Mirrors the player's body footprint with an immovable arcade body so the player bumps into it.
 * GameScene spawns these and routes A-presses at them into DialogueSystem via their dialogue table.
 */
import Phaser from "phaser"
import type { Dialogue } from "../core/dialogue"
import type { Direction } from "../core/input"
import { ROW_INDEX, SHEET_COLUMNS } from "./pcsheet"

// the gaze-mirror: which way to face when the player faces you
export const OPPOSITE: Record<Direction, Direction> = { down: "up", up: "down", left: "right", right: "left" }

/** A standing villager: sprite, body, and the dialogue it speaks. */
export class Npc {
  readonly sprite: Phaser.Physics.Arcade.Sprite
  readonly dialogue: Dialogue[]

  private readonly standColumn: number

  constructor(scene: Phaser.Scene, x: number, y: number, standColumn: number, dialogue: Dialogue[]) {
    this.sprite = scene.physics.add.sprite(x, y, "pc")
    this.standColumn = standColumn
    this.sprite.setFrame(standColumn)

    this.dialogue = dialogue

    this.sprite.body?.setSize(16, 16)
    this.sprite.body?.setOffset(0, 4)
    this.sprite.body!.immovable = true
  }

  /** Whether the NPC's body truly overlaps the probe — mere edge contact doesn't count. */
  overlaps(rect: Phaser.Geom.Rectangle): boolean {
    const b = this.bodyRect()
    return rect.x < b.right && b.x < rect.right &&
           rect.y < b.bottom && b.y < rect.bottom
  }

  /** The collision body as a plain rectangle, for geometric tests. */
  private bodyRect(): Phaser.Geom.Rectangle {
    const body = this.sprite.body!
    return new Phaser.Geom.Rectangle(body.left, body.top, body.width, body.height)
  }

  /** Turns to the stand pose facing the given direction. */
  face(direction: Direction): void {
    this.sprite.setFrame(ROW_INDEX[direction] * SHEET_COLUMNS + this.standColumn)
  }
}