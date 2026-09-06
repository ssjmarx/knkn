/**
 * The breadcrumb trail — a capped history of where the player has been.
 * Records recent positions and answers point-at-distance queries along the walked path.
 * GameScene feeds it every player step; Fox queries it to follow at a fixed gap.
 */
export interface Point2 {
  x: number
  y: number
}

/** A capacity-capped history of points along the player's walked path. */
export class Trail {
  private history: Point2[] = []
  readonly capacity: number

  constructor(capacity: number) {
    this.capacity = capacity
  }

  /** Appends a point, dropping the oldest once capacity is exceeded. */
  push(point: Point2): void {
    this.history.push(point)
    if (this.history.length > this.capacity) {
      this.history.shift()
    }
  }

  /** The most recent point, or undefined when nothing has been pushed yet. */
  last(): Point2 | undefined {
    return this.history[this.history.length - 1]
  }
  
  /** Interpolates the point exactly minDistance back along the walked path. */
  atPathDistance(minDistance: number): Point2 | undefined {
    let remaining = minDistance
    for (let i = this.history.length - 1; i > 0; i--) {
      const here = this.history[i]!
      const prev = this.history[i - 1]!
      const segment = Math.hypot(here.x - prev.x, here.y - prev.y)
      if (segment >= remaining) {
      const t = remaining / segment
      return {
          x: here.x + (prev.x - here.x) * t,
          y: here.y + (prev.y - here.y) * t
        }
      }
      remaining -= segment
    }
    return this.history[0]
  }
}
