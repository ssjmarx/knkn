// The forms-table suite — the sheet's structural invariants: nine rows, unique ids, BST 750, caps under the ceiling.
import { describe, it, expect } from "vitest"
import { FOX_FORMS } from "../src/data/forms"

describe("FOX_FORMS", () => {
  it("has nine forms", () => {
    expect(FOX_FORMS).toHaveLength(9)
  })

  it("has unique ids", () => {
    expect(new Set(FOX_FORMS.map((form) => form.id)).size).toBe(9)
  })

  it("gives every form a BST of exactly 750", () => {
    for (const form of FOX_FORMS) {
      const bst = form.caps.atk + form.caps.def + form.caps.spa + form.caps.spd + form.caps.spe
      expect(bst).toBe(750)
    }
  })

  it("keeps every cap at or under the 255 stat ceiling", () => {
    for (const form of FOX_FORMS) {
      for (const cap of Object.values(form.caps)) {
        expect(cap).toBeLessThanOrEqual(255)
      }
    }
  })
})