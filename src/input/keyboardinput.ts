/**
 * The keyboard source — maps the keyboard onto the shared Button contract.
 * Reads the arrow keys, z and x, enter and esc by default.
 * Feeds CompositeInput alongside KeyboardInput and TouchInput; no scene touches the pad directly.
 */
import { Action, Direction, InputSource, Button, axis, isAction, isDirection } from "../core/input"

/** The keyboard source — one Record<Button, Key> table for the whole pad. */
export class KeyboardInput implements InputSource {
  private keys: Record<Button, Phaser.Input.Keyboard.Key>

  constructor(scene: Phaser.Scene) {
    const keyboard = scene.input.keyboard!
    this.keys = {
      up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      a: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z),
      b: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X),
      start: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
      select: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC),
    }
  }

  /** Held left/right as a horizontal axis. */
  get x(): number {
    return axis(this.keys.left.isDown, this.keys.right.isDown)
  }

  /** Held up/down as a vertical axis. */
  get y(): number {
    return axis(this.keys.up.isDown, this.keys.down.isDown)
  }

  /** Table lookup: is this button currently held? */
  isDown(button: Button): boolean {
    return this.keys[button].isDown
  }

  /** Table lookup with JustDown: pressed since last read? */
  justPressed(button: Button): boolean {
    return Phaser.Input.Keyboard.JustDown(this.keys[button])
  }

  /** Nothing to clear — JustDown consumes on read. */
  endFrame(): void {}
}