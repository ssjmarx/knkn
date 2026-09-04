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
    this.fox.body!.setSize(20, 15);
    this.fox.body!.setOffset(6, 17);

    this.cursors = this.input.keyboard!.createCursorKeys();
    this.fox.play("fox-idle")
  }

  override update(): void {
    const vx = axisVelocity(this.cursors.left.isDown, this.cursors.right.isDown);
    const vy = axisVelocity(this.cursors.up.isDown, this.cursors.down.isDown);

    this.fox.setVelocityX(vx * WALK_SPEED);
    this.fox.setVelocityY(vy * WALK_SPEED);

    if (Math.abs(vx) > 0 || Math.abs(vy) > 0) {
        this.fox.play("fox-walk", true)
    } else {
        this.fox.play("fox-idle", true)
    }

    if (vx < 0) {
        this.fox.setFlipX(true)
    } if (vx > 0) {
        this.fox.setFlipX(false)
    }
  }
}

function axisVelocity(negative: boolean, positive: boolean): number {
  if (negative && positive) return 0;
  if (negative) return -1;
  if (positive) return 1;
  return 0;
}
