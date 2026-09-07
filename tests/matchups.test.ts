// The matchup sweep — every roster pair, both channels, across the level and power grids, bounded by the ruled envelope.
import { describe, it, expect } from "vitest"
import { damage, hitsToKo, type Die } from "../src/core/damage"
import { actualStat, maxHp, FOX_CURVE, type GrowthCurve } from "../src/core/stats"
import { FOX_FORMS, type StatCaps } from "../src/core/forms"

// Always rolls the highest face — the defender's worst case.
const maxDie: Die = (_min, max) => max

// Always rolls the lowest face — the attacker's worst case.
const minDie: Die = (min) => min

// The ruled bounds — retuned here, in one place, when playtesting speaks.
const OHKO_FLOOR = 2
const HITS_CEILING = 14
const CEILING_MIN_POWER = 60

// The level grid: the start, the guardian era, the power gate, the midgame, the Champion, the cap.
const LEVELS = [5, 15, 50, 100, 175, 255]

// The design band's edges and center.
const POWERS = [60, 100, 125]

// One swept combatant: a stat sheet plus the curve that grows it.
type Spirit = { id: string, caps: StatCaps, curve: GrowthCurve }

// The roster under test — the nine fox forms on the fox curve; future spirit types append here.
const ROSTER: readonly Spirit[] = FOX_FORMS.map((form) => ({
  id: form.id,
  caps: form.caps,
  curve: FOX_CURVE
}))

// Hits to KO through one channel: the attacker's strike stat against the defender's matching wall.
function hits(
  attacker: Spirit,
  defender: Spirit,
  level: number,
  power: number,
  channel: "atk" | "spa",
  die: Die
): number {
  const attack = actualStat(attacker.caps[channel], level, attacker.curve)
  const wall = actualStat(defender.caps[channel === "atk" ? "def" : "spd"], level, defender.curve)
  const perHit = damage({ level, power, attack, defense: wall }, die)
  return hitsToKo(maxHp(level), perHit)
}

describe("the roster's balance envelope", () => {
  it("never one-shots the defender — every pair, both channels, every level and power, best roll", () => {
    const violations: string[] = []
    for (const attacker of ROSTER) {
      for (const defender of ROSTER) {
        for (const level of LEVELS) {
          for (const power of POWERS) {
            for (const channel of ["atk", "spa"] as const) {
              const count = hits(attacker, defender, level, power, channel, maxDie)
              if (count < OHKO_FLOOR) {
                violations.push(`${attacker.id} → ${defender.id} ${channel} L${level} P${power}: ${count} hits`)
              }
            }
          }
        }
      }
    }
    expect(violations).toEqual([])
  })

  it("keeps the attacker's best channel inside the hits ceiling — worst roll, Power ≥ 60", () => {
    const violations: string[] = []
    for (const attacker of ROSTER) {
      for (const defender of ROSTER) {
        for (const level of LEVELS) {
          for (const power of POWERS) {
            if (power < CEILING_MIN_POWER) continue
            const physical = hits(attacker, defender, level, power, "atk", minDie)
            const special = hits(attacker, defender, level, power, "spa", minDie)
            const primary = Math.min(physical, special)
            if (primary > HITS_CEILING) {
              violations.push(`${attacker.id} → ${defender.id} primary L${level} P${power}: ${primary} hits`)
            }
          }
        }
      }
    }
    expect(violations).toEqual([])
  })

  it("anchors the Rule of 500 — the base mirror at L50 P100 is five hits at both extremes of the roll", () => {
    // 150/140 hardcoded on purpose: the anchor pins the locked sheet — a sheet change must redden it.
    const attack = actualStat(150, 50, FOX_CURVE)
    const defense = actualStat(140, 50, FOX_CURVE)
    const input = { level: 50, power: 100, attack, defense }
    expect(hitsToKo(maxHp(50), damage(input, maxDie))).toBe(5)
    expect(hitsToKo(maxHp(50), damage(input, minDie))).toBe(5)
  })
})