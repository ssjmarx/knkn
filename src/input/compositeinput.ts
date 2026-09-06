/**
 * The input merger — one InputSource facade standing in for many.
 * Combines keyboard, touch, and gamepad sources, OR-ing buttons and picking the strongest axis.
 * GameScene constructs it once and reads all player intent through this single object.
 */
import type { Button, InputSource } from "../core/input"

/** Merges several InputSources into one — any source speaking counts. */
export class CompositeInput implements InputSource {
  private readonly sources: readonly InputSource[]

  constructor(...sources: InputSource[]) {
    this.sources = sources
  }

  /** The strongest horizontal axis among the sources. */
  get x(): number {
    let best = 0
    for (const source of this.sources) {
      if (Math.abs(source.x) > Math.abs(best)) { best = source.x }
    }
    return best
  }

  /** The strongest vertical axis among the sources. */
  get y(): number {
    let best = 0
    for (const source of this.sources) {
      if (Math.abs(source.y) > Math.abs(best)) { best = source.y }
    }
    return best
  }

  /** True when any source currently holds the button. */
  isDown(action: Button): boolean {
    return this.sources.some((source) => source.isDown(action))
  }

  /** True when any source pressed the button since the last frame. */
  justPressed(action: Button): boolean {
    return this.sources.some((source) => source.justPressed(action))
  }

  /** Propagates end-of-frame clearing to every source. */
  endFrame(): void {
    for (const source of this.sources) { source.endFrame() }
  }
}
