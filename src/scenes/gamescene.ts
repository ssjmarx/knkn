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
import { npc_greeting } from "../core/dialogues"

/** The world scene: tilemap, actors, controls, and the update loop. */
export class GameScene extends Phaser.Scene {
  private player!: Player
  private fox!: Fox
  private trail!: Trail
  private controls!: InputSource
  private dialogueSystem!: DialogueSystem
  private flags = createFlags()
  private wasInsideTrigger = false

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

    // Create trigger (simple rectangle for now)
    const trigger = this.add.rectangle(200, 100, 64, 64, 0xff0000)
    trigger.setAlpha(0.3) // Semi-transparent so we can see it
    trigger.setData("dialogue", npc_greeting) // Store dialogue here

    const startX = map.widthInPixels / 2
    const startY = map.heightInPixels / 2

    this.trail = new Trail(TRAIL_SIZE + 6)
    this.fox = new Fox(this, startX, startY)
    this.player = new Player(this, startX, startY)
    this.physics.add.collider(this.player.sprite, walls)

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    this.player.sprite.setCollideWorldBounds(true)

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

    // Check for dialogue trigger
    this.checkDialogueTrigger()
  }

  /** Starts the trigger's dialogue on the frame the player first enters it. */
  private checkDialogueTrigger(): void {
    const trigger = this.children.list.find(
      (child) => child instanceof Phaser.GameObjects.Rectangle && child.getData("dialogue")
    ) as Phaser.GameObjects.Rectangle | undefined

    if (!trigger) return

    // Check if player is inside the trigger
    const player = this.player.sprite
    const triggerBounds = trigger.getBounds()

    const isInside = player.x > triggerBounds.x &&
                     player.x < triggerBounds.x + triggerBounds.width &&
                     player.y > triggerBounds.y &&
                     player.y < triggerBounds.y + triggerBounds.height

    // in checkDialogueTrigger():
    if (isInside && !this.wasInsideTrigger && !this.dialogueSystem.isShowing) {
      this.dialogueSystem.showDialogue(trigger.getData("dialogue"), this.flags)
    }
    this.wasInsideTrigger = isInside
  }
}
