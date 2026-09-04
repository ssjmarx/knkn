import Phaser from "phaser";

export class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload(): void {
    // 448x224 sheet = 14 columns x 7 rows of 32x32 frames (98 total)
    this.load.spritesheet("fox", "assets/fox_sprite_sheet_elthens.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create(): void {
    const walkRow = 2;
    const first = walkRow * 14;

    this.anims.create({
      key: "fox-walk",
      frames: this.anims.generateFrameNumbers("fox", { start: first, end: first + 7 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.start("Game");
  }
}
