// The typechart suite — the ruled chart pinned verbatim, its legend enforced, its load-bearing cells named.
import { describe, it, expect } from "vitest"
import { TYPECHART } from "../src/data/typechart"

// The legend's four values — 0 immune, ½ resisted, 1 neutral, 2 super-effective.
const LEGEND = [0, 0.5, 1, 2]

describe("the typechart", () => {
  it("pins the chart verbatim — the ruled 8×8, transcribed from the design doc", () => {
    expect(TYPECHART).toEqual({
      "sol":     { "sol": 0.5, "luna": 0.5, "mercury": 2, "venus": 2, "mars": 2, "jupiter": 1, "saturn": 0.5, "terra": 0.5, "spirit": 1 },
      "luna":    { "sol": 2, "luna": 0.5, "mercury": 0.5, "venus": 0.5, "mars": 2, "jupiter": 1, "saturn": 1, "terra": 0.5, "spirit": 1 },
      "mercury": { "sol": 0.5, "luna": 0.5, "mercury": 1, "venus": 1, "mars": 0.5, "jupiter": 2, "saturn": 2, "terra": 0.5, "spirit": 1 },
      "venus":   { "sol": 1, "luna": 0.5, "mercury": 1, "venus": 0.5, "mars": 1, "jupiter": 2, "saturn": 0.5, "terra": 2, "spirit": 1 },
      "mars":    { "sol": 1, "luna": 0.5, "mercury": 1, "venus": 2, "mars": 2, "jupiter": 1, "saturn": 0.5, "terra": 2, "spirit": 2 },
      "jupiter": { "sol": 2, "luna": 2, "mercury": 0.5, "venus": 0.5, "mars": 1, "jupiter": 0.5, "saturn": 2, "terra": 0, "spirit": 0.5 },
      "saturn":  { "sol": 0.5, "luna": 2, "mercury": 1, "venus": 2, "mars": 0.5, "jupiter": 1, "saturn": 0.5, "terra": 2, "spirit": 1 },
      "terra":   { "sol": 1, "luna": 1, "mercury": 2, "venus": 0.5, "mars": 2, "jupiter": 1, "saturn": 0.5, "terra": 0.5, "spirit": 1 },
      "spirit": { "sol": 1, "luna": 1, "mercury": 1, "venus": 1, "mars": 1, "jupiter": 1, "saturn": 0, "terra": 1, "spirit": 1 }
    })
  })

  it("keeps every cell inside the legend — immune, resisted, neutral, or super-effective", () => {
    const violations: string[] = []
    for (const [attack, row] of Object.entries(TYPECHART)) {
      for (const [defense, cell] of Object.entries(row)) {
        if (!LEGEND.includes(cell)) {
          violations.push(`${attack} → ${defense}: ${cell}`)
        }
      }
    }
    expect(violations).toEqual([])
  })

    it("makes Terra immune to Jupiter", () => {
    expect(TYPECHART.jupiter.terra).toBe(0)
  })

  it("lets Sol resist Saturn", () => {
    expect(TYPECHART.saturn.sol).toBe(0.5)
  })

  it("lets Saturn resist Mars", () => {
    expect(TYPECHART.mars.saturn).toBe(0.5)
  })

  it("lets Luna resist Mars", () => {
    expect(TYPECHART.mars.luna).toBe(0.5)
  })

  it("makes Mars and Terra mutually super-effective", () => {
    expect(TYPECHART.mars.terra).toBe(2)
    expect(TYPECHART.terra.mars).toBe(2)
  })

  it("holds the two true stalemates — Sol/Saturn and Luna/Venus, ½ both ways", () => {
    expect(TYPECHART.sol.saturn).toBe(0.5)
    expect(TYPECHART.saturn.sol).toBe(0.5)
    expect(TYPECHART.luna.venus).toBe(0.5)
    expect(TYPECHART.venus.luna).toBe(0.5)
  })

  it("points rows at columns — Jupiter cannot touch Terra, Terra answers neutrally", () => {
    expect(TYPECHART.jupiter.terra).toBe(0)
    expect(TYPECHART.terra.jupiter).toBe(1)
  })
})

it("makes spirit resist Jupiter", () => {
  expect(TYPECHART.jupiter.spirit).toBe(0.5)
})

it("makes spirit weak to Mars", () => {
  expect(TYPECHART.mars.spirit).toBe(2)
})

it("makes Saturn immune to spirit", () => {
  expect(TYPECHART.spirit.saturn).toBe(0)
})