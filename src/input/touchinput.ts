/**
 * The touch source — on-screen HTML buttons polled through pointer events.
 * Tracks each finger across down/move/up, mapping it to whichever button it's over and latching just-presses.
 * Feeds CompositeInput for mobile play; scenes never query the DOM buttons themselves.
 */
import { InputSource, Button, axis, isAction, isDirection } from "../core/input"

/** InputSource backed by on-screen buttons under finger tracking. */
export class TouchInput implements InputSource {
  private buttons: Record<Button, boolean> = { down: false, left: false, right: false, up: false, a: false, b: false, start: false, select: false }
  private just: Record<Button, boolean> = { down: false, left: false, right: false, up: false, a: false, b: false, start: false, select: false }
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

  /** The <button> element under the pointer, or null when over dead space. */
  private buttonUnder(event: PointerEvent): HTMLButtonElement | null {
    return document.elementFromPoint(event.clientX, event.clientY)?.closest("button") ?? null
  }

  /** Sets a button's held/just state and toggles its pressed styling. */
  private press(button: HTMLButtonElement, down: boolean): void {
    button.classList.toggle("pressed", down)
    const dir = button.dataset["dir"]
    const act = button.dataset["action"]
    if (isDirection(dir)) {
      this.buttons[dir] = down
      if (down) {
        this.just[dir] = true
      }
    } else if (isAction(act)) {
      this.buttons[act] = down
      if (down) {
        this.just[act] = true
      }
    }
  }

  /** Held left/right as a horizontal axis. */
  get x(): number { return axis(this.buttons.left, this.buttons.right) }
  /** Held up/down as a vertical axis. */
  get y(): number { return axis(this.buttons.up, this.buttons.down) }

  /** Table lookup: is this button currently held? */
  isDown(button: Button): boolean { return this.buttons[button] }

  /** Whether the button was pressed since the last endFrame. */
  justPressed(button: Button): boolean { return this.just[button] }

  /** Clears every just-pressed latch in preparation for the next frame. */
  endFrame(): void {
    for (const action of Object.keys(this.just) as Button[]) {
      this.just[action] = false
    }
  }
}
