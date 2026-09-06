/**
 * The gamepad source — maps a physical controller onto the shared Button contract.
 * Reads the left stick (with deadzone) or D-pad for axes and tracks edges in a wasDown table for justPressed.
 * Feeds CompositeInput alongside KeyboardInput and TouchInput; no scene touches the pad directly.
 */
import Phaser from "phaser"
import { Action, InputSource, Button, Direction, axis, isAction, isDirection } from "./input"

/** InputSource backed by the first connected gamepad. */
export class GamepadInput implements InputSource {
  private plugin: Phaser.Input.Gamepad.GamepadPlugin
  private wasDown: Record<Button, boolean> = { a: false, b: false, select: false, start: false, down: false, up: false, left: false, right: false }
  private deadzone = 0.15
  private buttonIndex: Record<Action, number> = { a: 0, b: 1, select: 8, start: 9 }

  constructor(scene: Phaser.Scene) {
    this.plugin = scene.input.gamepad!
  }

  /** The first connected pad, or undefined when none is plugged in. */
  private pad(): Phaser.Input.Gamepad.Gamepad | undefined {
    return this.plugin.total > 0 ? this.plugin.getPad(0) : undefined
  }

  /** Horizontal axis: left stick past the deadzone, else the D-pad. */
  get x(): number {
    const pad = this.pad()
    if (pad === undefined) return 0
    const raw = pad.leftStick.x
    if (Math.abs(raw) >= this.deadzone) return raw
    return axis(pad.left, pad.right)
  }

  /** Vertical axis: left stick past the deadzone, else the D-pad. */
  get y(): number {
    const pad = this.pad()
    if (pad === undefined) return 0
    const raw = pad.leftStick.y
    if (Math.abs(raw) >= this.deadzone) return raw
    return axis(pad.up, pad.down)
  }

  /** D-pad lookup for directions, indexed-button lookup for actions. */
  isDown(button: Button): boolean {
    const pad = this.pad()
    if (pad === undefined) {
      return false
    }
    if (isDirection(button)) {
      return pad[button]
    }
    return pad.buttons[this.buttonIndex[button]]?.pressed ?? false
  }

  /** Edge detection against the wasDown table, updated as a side effect of the read. */
  justPressed(button: Button): boolean {
    const pad = this.pad()
    if (pad === undefined) {
      this.wasDown[button] = false
      return false
    }
    const isDown = this.isDown(button)
    const wasDown = this.wasDown[button]
    this.wasDown[button] = isDown
    return isDown && !wasDown
  }
  /** Nothing to clear — the wasDown table is consumed by justPressed itself. */
  endFrame(): void {
    
  }
}
