import Phaser from "phaser"
import { GAME_WIDTH, GAME_HEIGHT, WALK_SPEED, TILE_SIZE } from "../config"
import { TiledMapHead } from "../types"

export class GameScene extends Phaser.Scene {
  private fox!: Phaser.Physics.Arcade.Sprite
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys

  constructor() {
    super("Game")
  }

  create(): void {
    const head = this.cache.json.get("map") as TiledMapHead
    if (head.tilewidth !== TILE_SIZE || head.tileheight !== TILE_SIZE) {
      throw new Error(`map tiles are ${head.tilewidth}px but TILE_SIZE is ${TILE_SIZE} — the map and the code disagree`)
    }

    const map = this.make.tilemap({ key: "map" })
    const tileset = map.addTilesetImage("town", "tiles")
    const ground = map.createLayer("ground", tileset!)
    const walls = map.createLayer("walls", tileset!)
    walls.setCollisionByProperty({ collides: true })

    this.fox = this.physics.add.sprite(map.widthInPixels / 2, map.heightInPixels / 2, "fox")
    this.fox.body!.setSize(20, 15)
    this.fox.body!.setOffset(6, 17)
    this.fox.setCollideWorldBounds(true)
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.physics.add.collider(this.fox, walls)

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.fox, true)

    this.cursors = this.input.keyboard!.createCursorKeys()
    this.fox.play("fox-idle")
  }

  override update(): void {
    const vx = axisVelocity(this.cursors.left.isDown, this.cursors.right.isDown)
    const vy = axisVelocity(this.cursors.up.isDown, this.cursors.down.isDown)

    this.fox.setVelocityX(vx * WALK_SPEED)
    this.fox.setVelocityY(vy * WALK_SPEED)

    if (vx !== 0 || vy !== 0) {
        this.fox.play("fox-walk", true)
    } else {
        this.fox.play("fox-idle", true)
    }

    if (vx < 0) {
        this.fox.setFlipX(true)
    } else if (vx > 0) {
        this.fox.setFlipX(false)
    }
  }
}

function axisVelocity(negative: boolean, positive: boolean): number {
  if (negative && positive) return 0
  if (negative) return -1
  if (positive) return 1
  return 0
}
