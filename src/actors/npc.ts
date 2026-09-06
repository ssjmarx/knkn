/**
 * The villager actor — a static sprite standing in the world, carrying its conversation.
 * Mirrors the player's body footprint with an immovable arcade body so the player bumps into it.
 * GameScene spawns these and routes A-presses at them into DialogueSystem via their dialogue table.
 */
import Phaser from "phaser"
import type { Dialogue } from "../core/dialogue"

/** A standing villager: sprite, body, and the dialogue it speaks. */
export class Npc {
  readonly sprite: Phaser.Physics.Arcade.Sprite
  readonly dialogue: Dialogue[]

  constructor(scene: Phaser.Scene, x: number, y: number, standFrame: number, dialogue: Dialogue[]) {
    this.sprite = scene.physics.add.sprite(x, y, "pc")
    this.sprite.setFrame(standFrame)
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
}