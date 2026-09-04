import Phaser from "phaser";
import { GAME_WIDTH, GAME_HEIGHT, WALK_SPEED } from "../config";

export class GameScene extends Phaser.Scene {
  private fox!: Phaser.Physics.Arcade.Sprite;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super("Game");
  }

  create(): void {
    this.fox = this.physics.add.sprite(GAME_WIDTH / 2, GAME_HEIGHT / 2, "fox");
    this.fox.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.fox.play("fox-walk");
  }

  override update(): void {
    const vx = axisVelocity(this.cursors.left.isDown, this.cursors.right.isDown);
    const vy = axisVelocity(this.cursors.up.isDown, this.cursors.down.isDown);

    this.fox.setVelocityX(vx * WALK_SPEED);
    this.fox.setVelocityY(vy * WALK_SPEED);
  }
}

function axisVelocity(negative: boolean, positive: boolean): number {
  if (negative && positive) return 0;
  if (negative) return -1;
  if (positive) return 1;
  return 0;
}
