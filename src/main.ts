/**
 * The entry point — boots Phaser with the game's config and scene list.
 * Builds the 240×240 pixel-art arcade-physics game, registers Boot, Game, and DialogueSystem, and mounts it.
 * index.html loads this via Vite; every other module hangs off the scenes registered here.
 */
import Phaser from "phaser"
import { GAME_WIDTH, GAME_HEIGHT } from "./config"
import { BootScene } from "./scenes/bootscene"
import { GameScene } from "./scenes/gamescene"
import { DialogueSystem } from "./dialoguesystem"

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  input: {
    gamepad: true
  },
  pixelArt: true,
  backgroundColor: "#ff00ff",
  physics: {
    default: "arcade",
    arcade: { gravity: { x: 0, y: 0 } },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoRound: true,
  },
  scene: [BootScene, GameScene, DialogueSystem]
}

new Phaser.Game(config)
