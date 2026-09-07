// The stage-multiplier suite — pins the ruled ±6 table exactly, and its near-symmetry.
import { describe, it, expect } from "vitest"
import { stageMultiplier } from "../src/core/stages"

const EXPECTED: readonly [number, number][] = [
  [-6, 2 / 8], [-5, 2 / 7], [-4, 2 / 6], [-3, 2 / 5], [-2, 2 / 4], [-1, 2 / 3],
  [0, 1], [1, 3 / 2], [2, 2], [3, 5 / 2], [4, 3], [5, 7 / 2], [6, 4]
]

describe("stageMultiplier", () => {
  for (const [stage, multiplier] of EXPECTED) {
    it(`stage ${stage} multiplies by ${multiplier}`, () => {
      expect(stageMultiplier(stage)).toBe(multiplier)
    })
  }

  it("mirror stages multiply back to ~1 — exact arithmetic, approximate floats", () => {
    for (let stage = 1; stage <= 6; stage++) {
      expect(stageMultiplier(stage) * stageMultiplier(-stage)).toBeCloseTo(1)
    }
  })
})