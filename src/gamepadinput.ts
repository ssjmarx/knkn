import Phaser from "phaser"
import type { Action, InputSource } from "./input"

export class GamepadInput implements InputSource {
  private plugin: Phaser.Input.Gamepad.GamepadPlugin
  private wasDown: Record<Action, boolean> = { confirm: false, cancel: false }
  private deadzone = 0.15

  constructor(scene: Phaser.Scene) {
    this.plugin = scene.input.gamepad!
  }

  private pad(): Phaser.Input.Gamepad.Gamepad | undefined {
    return this.plugin.total > 0 ? this.plugin.getPad(0) : undefined
  }

  get x(): number {
    const raw = this.pad()?.leftStick.x ?? 0
    return Math.abs(raw) < this.deadzone ? 0 : raw
    }

    get y(): number {
    const raw = this.pad()?.leftStick.y ?? 0
    return Math.abs(raw) < this.deadzone ? 0 : raw
    }

  isDown(action: Action): boolean {
    const pad = this.pad()
    if (pad === undefined) {
      return false
    }
    const button = action === "confirm" ? pad.buttons[0] : pad.buttons[1]
    return button?.pressed ?? false
  }

  justPressed(action: Action): boolean {
    const pad = this.pad()
    if (pad === undefined) {
        this.wasDown[action] = false
        return false
    }

    const button = action === "confirm" ? pad.buttons[0] : pad.buttons[1]
    const isDown = button?.pressed ?? false
    const wasDown = this.wasDown[action]
    this.wasDown[action] = isDown

    return isDown && !wasDown
    }

  endFrame(): void {
    
  }
}
