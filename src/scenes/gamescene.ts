/**
 * The main play scene — map, actors, and the frame loop that wires them together.
 * Builds the tilemap world, spawns Player and Fox with the Trail between them, and routes input between play and dialogue.
 * Registered after BootScene; it owns the composite controls and the dialogue trigger check.
 */
import Phaser from "phaser"
import { TILE_SIZE, WALK_SPEED, TRAIL_SIZE, FOLLOW_GAP } from "../config"
import { Trail } from "../core/trail"
import { Player } from "../actors/player"
import { Fox } from "../actors/fox"
import { InputSource } from "../core/input"
import { KeyboardInput } from "../input/keyboardinput"
import { TouchInput } from "../input/touchinput"
import { CompositeInput } from "../input/compositeinput"
import { GamepadInput } from "../input/gamepadinput"
import { DialogueSystem } from "../ui/dialoguesystem"
import { createFlags } from "../core/flags"
import { npc1_chat, npc2_chat } from "../core/dialogues"
import { Npc } from "../actors/npc"

/** The world scene: tilemap, actors, controls, and the update loop. */
export class GameScene extends Phaser.Scene {
  private player!: Player
  private fox!: Fox
  private trail!: Trail
  private controls!: InputSource
  private dialogueSystem!: DialogueSystem
  private flags = createFlags()
  private npcs!: Npc[]

  constructor() {
    super("Game")
  }

  /** Builds the map and collision, spawns the actors, and wires the composite input. */
  create(): void {
    const map = this.make.tilemap({ key: "map" })
    if (map.tileWidth !== TILE_SIZE || map.tileHeight !== TILE_SIZE) {
      throw new Error(`map tiles are ${map.tileWidth}px but TILE_SIZE is ${TILE_SIZE}`)
    }

    if (!this.scene.isActive("DialogueSystem")) this.scene.launch("DialogueSystem")
    this.dialogueSystem = this.scene.get("DialogueSystem") as DialogueSystem

    const tileset = map.addTilesetImage("town", "tiles")!
    map.createLayer("ground", tileset)
    const walls = map.createLayer("walls", tileset)
    const branches = map.createLayer("branches", tileset)
    walls.setCollisionByProperty({ collides: true })
    branches.setDepth(1)

    const startX = map.widthInPixels / 2
    const startY = map.heightInPixels / 2

    this.trail = new Trail(TRAIL_SIZE + 6)
    this.fox = new Fox(this, startX, startY)
    this.player = new Player(this, startX, startY)
    this.physics.add.collider(this.player.sprite, walls)

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.player.sprite.setCollideWorldBounds(true)

    // tile centers: player start + 32 up and 32 apart
    // magic numbers but its fine for now
    this.npcs = [
      new Npc(this, startX + 16, startY - 32, 4, npc1_chat),
      new Npc(this, startX - 16, startY - 32, 7, npc2_chat)
    ]
    this.physics.add.collider(this.player.sprite, this.npcs.map((npc) => npc.sprite))

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.cameras.main.startFollow(this.player.sprite, true)

    this.controls = new CompositeInput(
      new KeyboardInput(this),
      new TouchInput(document.getElementById("controls")!),
      new GamepadInput(this)
    )
  }

  /** Per frame: move the player and fox — or forward input while dialogue is showing. */
  override update(): void {
    if (this.dialogueSystem.isShowing) {
      this.dialogueSystem.handleInput(this.controls)
    } else {
      this.player.move(this.controls, WALK_SPEED)
      this.tryTalk()

      const here = { x: this.player.sprite.x, y: this.player.sprite.y }
      const last = this.trail.last()
      if (last === undefined || last.x !== here.x || last.y !== here.y) {
        this.trail.push(here)
      }

      const target = this.trail.atPathDistance(FOLLOW_GAP)
      this.fox.chase(target, WALK_SPEED)

      const vx = this.fox.sprite.body?.velocity.x ?? 0
      const vy = this.fox.sprite.body?.velocity.y ?? 0
      const moving = Math.abs(vx) + Math.abs(vy) > 5

      this.fox.sprite.play(moving ? "fox-walk" : "fox-idle", true)
      if (vx < -0.5) {
        this.fox.sprite.setFlipX(true)
      } else if (vx > 0.5) {
        this.fox.sprite.setFlipX(false)
      }
    }

    this.controls.endFrame()
  }

  /** Talks to whatever NPC stands in the player's facing tile, on a fresh A press. */
  private tryTalk(): void {
    if (!this.controls.justPressed("a")) return

    const probe = this.player.frontTile()
    const npc = this.npcs.find((npc) => npc.overlaps(probe))
    if (npc) this.dialogueSystem.showDialogue(npc.dialogue, this.flags)
  }
}