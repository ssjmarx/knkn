// The damage-formula suite — hand-computed hits, cancellation proofs, injected dice, and float tolerances.
import { describe, it, expect } from "vitest"
import { damage, hitsToKo, type Die } from "../src/core/damage"
import { stageMultiplier } from "../src/core/stages"
import { actualStat, maxHp, FOX_CURVE } from "../src/core/stats"

// Always rolls the highest face — the deterministic best case.
const maxDie: Die = (min, max) => max

// Always rolls the lowest face — the deterministic worst case.
const minDie: Die = (min) => min

describe("damage — the roll", () => {
  it("asks its die for exactly one integer in the ruled 85–100 range — the ruling pinned as law", () => {
    const calls: [number, number][] = []
    const spy: Die = (min, max) => {
      calls.push([min, max])
      return max
    }
    damage({ level: 5, power: 100, attack: 76, defense: 76 }, spy)
    expect(calls).toEqual([[85, 100]])
  })

  it("multiplies by exactly 1 at the top roll — the 10 stays 10, bit-exact", () => {
    expect(damage({ level: 5, power: 100, attack: 76, defense: 76 }, maxDie)).toBe(10)
  })

  it("takes the mirror to ~8.5 at the bottom roll", () => {
    expect(damage({ level: 5, power: 100, attack: 76, defense: 76 }, minDie)).toBeCloseTo(8.5)
  })

  it("lands on ~9.2 at a mid roll of 92", () => {
    expect(damage({ level: 5, power: 100, attack: 76, defense: 76 }, () => 92)).toBeCloseTo(9.2)
  })

  it("keeps every possible roll inside the min–max brackets", () => {
    const input = { level: 5, power: 100, attack: 76, defense: 76 }
    const lowest = damage(input, minDie)
    const highest = damage(input, maxDie)
    for (let roll = 85; roll <= 100; roll++) {
      const rolled = damage(input, () => roll)
      expect(rolled).toBeGreaterThanOrEqual(lowest)
      expect(rolled).toBeLessThanOrEqual(highest)
    }
  })
})

describe("damage — the math at the top roll", () => {
  it("is blind to stat scale when attack equals defense — 82/82 and 9999/9999 both give exactly 10", () => {
    expect(damage({ level: 5, power: 100, attack: 82, defense: 82 }, maxDie)).toBe(10)
    expect(damage({ level: 5, power: 100, attack: 9999, defense: 9999 }, maxDie)).toBe(10)
  })

  it("doubles the scaled term, not the flat — Pen 50% gives 18, not 20", () => {
    expect(damage({ level: 5, power: 100, attack: 76, defense: 76, pen: 0.5 }, maxDie)).toBe(18)
  })

  it("a +2 attack stage lands on the same 18 from the opposite side", () => {
    expect(damage({ level: 5, power: 100, attack: 76 * stageMultiplier(2), defense: 76 }, maxDie)).toBe(18)
  })

  it("gives exactly 26 at L25 Power 100 (1200/50 + 2)", () => {
    expect(damage({ level: 25, power: 100, attack: 76, defense: 76 }, maxDie)).toBe(26)
  })

  it("gives ~16.4 at L25 Power 60 — the first non-integer, matched with tolerance", () => {
    expect(damage({ level: 25, power: 60, attack: 76, defense: 76 }, maxDie)).toBeCloseTo(16.4)
  })

  it("takes the flat 2 down to ~1.71 at the worst roll — the floor is no longer flat, by ruling", () => {
    expect(damage({ level: 5, power: 1, attack: 50, defense: 255 }, minDie)).toBeCloseTo(1.7133)
  })
})

describe("hitsToKo", () => {
  it("rounds up — 25 HP at 10 per hit takes 3", () => {
    expect(hitsToKo(25, 10)).toBe(3)
  })

  it("exact division needs no round-up — 25 at 12.5 is 2", () => {
    expect(hitsToKo(25, 12.5)).toBe(2)
  })

  it("overkill is still one hit — 25 at 30", () => {
    expect(hitsToKo(25, 30)).toBe(1)
  })
})

describe("modules composed — the L5 Mars self-mirror", () => {
  const attack = actualStat(200, 5, FOX_CURVE)
  const defense = actualStat(110, 5, FOX_CURVE)
  const input = { level: 5, power: 100, attack, defense }

  it("is a two-hit fight at the best roll — caps to curve to stats to damage", () => {
    const perHit = damage(input, maxDie)
    expect(perHit).toBeCloseTo(16.43)
    expect(hitsToKo(maxHp(5), perHit)).toBe(2)
  })

  it("stays a two-hit fight at the worst roll — ~13.96 per hit against the 25 HP pool", () => {
    const perHit = damage(input, minDie)
    expect(perHit).toBeCloseTo(13.9643)
    expect(hitsToKo(maxHp(5), perHit)).toBe(2)
  })
})