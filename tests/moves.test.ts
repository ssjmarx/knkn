// The moves suite — the shared 24: id pins, load-bearing numbers, and schema-shape invariants.
import { describe, it, expect } from "vitest"
import { MOVES } from "../src/data/moves"

describe("the shared move table", () => {
  it("holds exactly the 24 shared moves, by id", () => {
    expect(MOVES.map((m) => m.id)).toEqual([
      "sun-spark", "dew-lance", "gust-cut", "bloom-whip", "ember-bite", "spark-snap", "hour-blade", "root-whip",
      "daze-snap", "sleep-pollen", "cinder-bite", "glare-gaze",
      "renew", "ward-stance", "endure", "center", "nip", "twin-bite", "leech-bite", "scatter-gust",
      "war-cry", "focus-mind", "stone-stance", "rally"
    ])
  })

  it("keeps every id unique", () => {
    expect(new Set(MOVES.map((m) => m.id)).size).toBe(MOVES.length)
  })

  it("pins the load-bearing numbers — power and weight, transcribed from §6.2 and the rulings", () => {
    expect(MOVES.map((m) => [m.id, m.power ?? 0, m.weight])).toEqual([
      ["sun-spark", 70, 5], ["dew-lance", 70, 5], ["gust-cut", 70, 5], ["bloom-whip", 70, 5],
      ["ember-bite", 70, 5], ["spark-snap", 70, 5], ["hour-blade", 70, 5], ["root-whip", 70, 5],
      ["daze-snap", 60, 6], ["sleep-pollen", 60, 6], ["cinder-bite", 60, 6], ["glare-gaze", 60, 6],
      ["renew", 0, 10], ["ward-stance", 0, 6], ["endure", 0, 4], ["center", 0, 4],
      ["nip", 35, 2], ["twin-bite", 35, 3], ["leech-bite", 50, 5], ["scatter-gust", 45, 5],
      ["war-cry", 0, 4], ["focus-mind", 0, 4], ["stone-stance", 0, 4], ["rally", 0, 6]
    ])
  })

  it("keeps powers and weights inside guardrail ranges", () => {
    const violations: string[] = []
    for (const m of MOVES) {
      if (m.power !== undefined && (m.power < 30 || m.power > 130)) violations.push(`${m.id}: power ${m.power}`)
      if (m.weight < 1 || m.weight > 15) violations.push(`${m.id}: weight ${m.weight}`)
    }
    expect(violations).toEqual([])
  })

  it("never mixes channels — support moves carry no power, attackers always do", () => {
    const violations: string[] = []
    for (const m of MOVES) {
      if (m.category === "support" && m.power !== undefined) violations.push(`${m.id}: support with power ${m.power}`)
      if (m.category !== "support" && m.power === undefined) violations.push(`${m.id}: attacker without power`)
    }
    expect(violations).toEqual([])
  })

  it("pairs and bounds every optional effect — status needs a chance, numbers stay in their domains", () => {
    const violations: string[] = []
    for (const m of MOVES) {
      if ((m.status !== undefined) !== (m.statusChance !== undefined)) violations.push(`${m.id}: status/chance mismatch`)
      if (m.statusChance !== undefined && (m.statusChance < 1 || m.statusChance > 100)) violations.push(`${m.id}: chance ${m.statusChance}`)
      if (m.drain !== undefined && (m.drain < 1 || m.drain > 100)) violations.push(`${m.id}: drain ${m.drain}`)
      if (m.heal !== undefined && (m.heal < 1 || m.heal > 100)) violations.push(`${m.id}: heal ${m.heal}`)
      if (m.selfStages !== undefined) {
        for (const [stat, stage] of Object.entries(m.selfStages)) {
          if (stage! < -6 || stage! > 6) violations.push(`${m.id}: ${stat} stage ${stage}`)
        }
      }
    }
    expect(violations).toEqual([])
  })
})