import type { Action, Direction, InputSource } from "./input"

export class TouchInput implements InputSource {
  private dirs: Record<Direction, boolean> = { down: false, left: false, right: false, up: false }
  private actions: Record<Action, boolean> = { confirm: false, cancel: false }
  private just: Record<Action, boolean> = { confirm: false, cancel: false }
  // pointerId → button under that finger, or null if it's over a dead zone
  private held = new Map<number, HTMLButtonElement | null>()

  constructor(controls: HTMLElement) {
    controls.addEventListener("pointerdown", (event) => {
      const button = this.buttonUnder(event)
      this.held.set(event.pointerId, button)   // may be null — keep tracking anyway
      if (button) this.press(button, true)
    })

    window.addEventListener("pointermove", (event) => {
      if (!this.held.has(event.pointerId)) return
      const current = this.held.get(event.pointerId) ?? null
      const button = this.buttonUnder(event)
      if (button === current) return
      if (current) this.press(current, false)
      this.held.set(event.pointerId, button)   // never delete here
      if (button) this.press(button, true)
    })

    const release = (event: PointerEvent): void => {
      const current = this.held.get(event.pointerId)
      if (current) this.press(current, false)
      this.held.delete(event.pointerId)
    }
    window.addEventListener("pointerup", release)
    window.addEventListener("pointercancel", release)
  }

  private buttonUnder(event: PointerEvent): HTMLButtonElement | null {
    return document.elementFromPoint(event.clientX, event.clientY)?.closest("button") ?? null
  }

  private press(button: HTMLButtonElement, down: boolean): void {
    button.classList.toggle("pressed", down)
    const dir = button.dataset["dir"]
    const act = button.dataset["action"]
    if (dir === "down" || dir === "left" || dir === "right" || dir === "up") {
      this.dirs[dir] = down
    } else if (act === "confirm" || act === "cancel") {
      this.actions[act] = down
      if (down) {
        this.just[act] = true
      }
    }
  }

  get x(): number { return axis(this.dirs.left, this.dirs.right) }
  get y(): number { return axis(this.dirs.up, this.dirs.down) }

  isDown(action: Action): boolean { return this.actions[action] }

  justPressed(action: Action): boolean { return this.just[action] }

  endFrame(): void {
    this.just.confirm = false
    this.just.cancel = false
  }
}

function axis(negative: boolean, positive: boolean): number {
  if (negative && positive) return 0
  if (negative) return -1
  if (positive) return 1
  return 0
}