export interface Point2 {
  x: number
  y: number
}

export class Trail {
  private history: Point2[] = []
  readonly capacity: number

  constructor(capacity: number) {
    this.capacity = capacity
  }

  push(point: Point2): void {
    this.history.push(point)
    if (this.history.length > this.capacity) {
      this.history.shift()
    }
  }

  last(): Point2 | undefined {
    return this.history[this.history.length - 1]
  }
  
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
