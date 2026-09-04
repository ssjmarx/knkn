import Phaser from "phaser";
import { GAME_WIDTH, GAME_HEIGHT } from "./config";

class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload(): void {
    this.load.image("fox_single", "assets/fox_single_elthens.png")
  }

  create(): void {
    this.add.image(GAME_WIDTH / 2, GAME_HEIGHT / 2, "fox_single")
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: true,
  backgroundColor: "#ff00ff",
  scene: [BootScene],
};

new Phaser.Game(config);
