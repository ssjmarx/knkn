import Phaser from "phaser";
import { GAME_WIDTH, GAME_HEIGHT, VIEW_SCALE } from "./config";
import { BootScene } from "./scenes/bootscene";
import { GameScene } from "./scenes/gamescene";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: true,
  backgroundColor: "#ff00ff",
  physics: {
    default: "arcade",
    arcade: { gravity: { x: 0, y: 0 } },
  },
  scale: {
    zoom: VIEW_SCALE,
  },
  scene: [BootScene, GameScene],
};

new Phaser.Game(config);
