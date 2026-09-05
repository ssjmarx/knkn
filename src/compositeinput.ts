import type { Button, InputSource } from "./input"

export class CompositeInput implements InputSource {
  private readonly sources: readonly InputSource[]

  constructor(...sources: InputSource[]) {
    this.sources = sources
  }

  get x(): number {
    let best = 0
    for (const source of this.sources) {
      if (Math.abs(source.x) > Math.abs(best)) { best = source.x }
    }
    return best
  }

  get y(): number {
    let best = 0
    for (const source of this.sources) {
      if (Math.abs(source.y) > Math.abs(best)) { best = source.y }
    }
    return best
  }

  isDown(action: Button): boolean {
    return this.sources.some((source) => source.isDown(action))
  }

  justPressed(action: Button): boolean {
    return this.sources.some((source) => source.justPressed(action))
  }

  endFrame(): void {
    for (const source of this.sources) { source.endFrame() }
  }
}
