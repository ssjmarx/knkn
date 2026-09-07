// The day/night tint suite — the phase table's contract as assertions: every edge probed on both sides.
import { describe, it, expect } from "vitest"
import { tintForHour } from "../src/core/daynight"

// [hour, expected color, expected alpha, label] — transcribed from the PHASES source, never from the function's output.
type Row = readonly [number, number, number, string]

const CASES: readonly Row[] = [
  [0, 0x001030, 0.45, "night — the circle's from-edge"],
  [4, 0x001030, 0.45, "night's last hour, one before dawn"],
  [5, 0x68385c, 0.25, "dawn's first hour"],
  [6, 0x68385c, 0.25, "dawn's last hour"],
  [7, 0xffffff, 0, "day's first hour"],
  [16, 0xffffff, 0, "day's last hour, one before dusk"],
  [17, 0x885820, 0.18, "dusk's first hour"],
  [18, 0x885820, 0.18, "dusk's last hour"],
  [19, 0x28284c, 0.35, "evening's first hour"],
  [20, 0x28284c, 0.35, "evening's last hour"],
  [21, 0x001030, 0.45, "night's first hour"],
  [23, 0x001030, 0.45, "night's last hour — the circle's far side"],
  [24, 0xffffff, 0, "beyond the last phase — the plain-day fallback"]
]

describe("tintForHour — the phase table's edges", () => {
  for (const [hour, color, alpha, label] of CASES) {
    it(`hour ${hour}: ${label}`, () => {
      expect(tintForHour(hour)).toEqual({ color, alpha })
    })
  }
})

describe("tintForHour — the day as a continuum", () => {
  it("changes tint only at the table's from-edges — 5, 7, 17, 19, 21 — and nowhere else", () => {
    const changeHours: number[] = []
    for (let hour = 1; hour <= 23; hour++) {
      const before = tintForHour(hour - 1)
      const after = tintForHour(hour)
      if (before.color !== after.color || before.alpha !== after.alpha) {
        changeHours.push(hour)
      }
    }
    expect(changeHours).toEqual([5, 7, 17, 19, 21])
  })

  it("wraps at midnight — hours 23 and 0 share the night tint, the clock's two sides", () => {
    expect(tintForHour(23)).toEqual(tintForHour(0))
  })
})

describe("tintForHour — the table's privacy", () => {
  it("returns fresh tints — same phase, equal contents, never the table's own row", () => {
    expect(tintForHour(0)).toEqual(tintForHour(4))
    expect(tintForHour(0)).not.toBe(tintForHour(4))
  })
})