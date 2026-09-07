// The stat-formula suite — hand-computed expectations for cap-grown stats and the HP law.
import { describe, it, expect } from "vitest"
import { actualStat, maxHp, FOX_CURVE } from "../src/core/stats"

describe("maxHp", () => {
  it("gives 25 HP at the starting level 5", () => {
    expect(maxHp(5)).toBe(25)
  })

  it("gives 1025 HP at the level cap 255", () => {
    expect(maxHp(255)).toBe(1025)
  })

  it("grows by exactly 4 HP per level across the whole range", () => {
    for (let level = 5; level < 255; level++) {
      expect(maxHp(level + 1) - maxHp(level)).toBe(4)
    }
  })
})

describe("actualStat (fox curve)", () => {
  it("gives 76 for the base form's 150 attack cap at L5 — the floor bites (76.47 → 76)", () => {
    expect(actualStat(150, 5, FOX_CURVE)).toBe(76)
  })

  it("gives 50 for the sheet's lowest cap, 100, at L5 — the floor bites again (50.98 → 50)", () => {
    expect(actualStat(100, 5, FOX_CURVE)).toBe(50)
  })

  it("is born at exactly half its cap at L0 (170 × 0.5 = 85, float-exact)", () => {
    expect(actualStat(170, 0, FOX_CURVE)).toBe(85)
  })

  it("gives exactly the cap at L255 — the sheet is the destination, by ruling", () => {
    expect(actualStat(200, 255, FOX_CURVE)).toBe(200)
  })

  it("clamps a synthetic over-cap stat to 255 — the ceiling guard", () => {
    expect(actualStat(300, 255, FOX_CURVE)).toBe(255)
  })

  it("honors a different curve — an early-bloom spirit (start 0.75, exponent 0.5) sits higher at L5", () => {
    expect(actualStat(100, 5, { start: 0.75, exponent: 0.5 })).toBe(78)
  })
})