// The harness canary — proves the /tests wiring, relative imports, and the runner itself.
import { describe, it, expect } from "vitest"
import { axis } from "../src/core/input"

describe("axis", () => {
  it("returns -1 when only the negative direction is held", () => {
    expect(axis(true, false)).toBe(-1)
  })
  it("returns 0 when nothing is held", () => {
    expect(axis(false, false)).toBe(0)
  })
  it("returns 1 when only the positive direction is held", () => {
    expect(axis(false, true)).toBe(1)
  })
})