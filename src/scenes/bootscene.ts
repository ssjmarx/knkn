/**
 * The boot scene — loads every asset and animation before play begins.
 * Preloads the sprite sheets and tilemap, registers the pc/fox animations, then hands off to GameScene.
 * First scene in Phaser's list; nothing renders until its work is done.
 */
import Phaser from "phaser"

/** Asset-load-and-handoff scene; runs once at startup. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot")
  }

  /** Loads the pc/fox sprite sheets, tileset image, and tilemap JSON. */
  preload(): void {
    this.load.spritesheet("pc", "assets/free_character_1-3_super_retro_world.png", {
      frameWidth: 16,
      frameHeight: 20
    })

    this.load.spritesheet("fox", "assets/fox_sprite_sheet_elthens.png", {
      frameWidth: 32,
      frameHeight: 32
    })

    // test map
    this.load.image("tiles", "assets/exterior_grumpyfunction.png")
    this.load.tilemapTiledJSON("map", "assets/test_area.json")
  }

  /** Registers the walk/idle animations for both sprites and starts GameScene. */
  create(): void {
    const walkIndex = 28
    const idleIndex = 0

    const makeWalk = (key: string, start: number): void => {
      this.anims.create({
        key,
        frames: this.anims.generateFrameNumbers("pc", {
          frames: [start, start + 1, start + 2, start + 1]
        }),
        frameRate: 6,
        repeat: -1
      })
    }

    makeWalk("pc-walk-down", 0)
    makeWalk("pc-walk-left", 9)
    makeWalk("pc-walk-right", 18)
    makeWalk("pc-walk-up", 27)

    this.anims.create({
      key: "fox-walk",
      frames: this.anims.generateFrameNumbers("fox", { start: walkIndex, end: walkIndex + 7 }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: "fox-idle",
      frames: this.anims.generateFrameNumbers("fox", { start: idleIndex, end: idleIndex + 4 }),
      frameRate: 6,
      repeat: -1
    })

    this.scene.start("Game")
  }
}
