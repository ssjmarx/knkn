// The moves suite — the shared 37: id pins, load-bearing numbers, and schema-shape invariants.
import { describe, it, expect } from "vitest"
import { MOVES } from "../src/data/moves"

describe("the shared move table", () => {
  it("holds exactly the 37 shared moves, by id", () => {
    expect(MOVES.map((m) => m.id)).toEqual([
      "sun-spark", "dew-lance", "gust-cut", "bloom-whip", "ember-bite", "spark-snap", "hour-blade", "root-whip",
      "daze-snap", "sleep-pollen", "cinder-bite", "glare-gaze",
      "renew", "ward-stance", "endure", "center", "nip", "twin-bite", "leech-bite", "scatter-gust",
      "war-cry", "focus-mind", "stone-stance", "rally",
      "strike", "fang-barrage", "true-strike", "quickstep", "fade-step", "ghost-step",
      "attune", "deep-attune", "soul-attune",
      "curl", "iron-curl", "steel-curl",
      "dawn-bolt"
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
      ["war-cry", 0, 4], ["focus-mind", 0, 4], ["stone-stance", 0, 4], ["rally", 0, 6],
      ["strike", 50, 3], ["fang-barrage", 75, 5], ["true-strike", 95, 8],
      ["quickstep", 40, 2], ["fade-step", 50, 3], ["ghost-step", 60, 8],
      ["attune", 0, 4], ["deep-attune", 0, 6], ["soul-attune", 0, 8],
      ["curl", 0, 4], ["iron-curl", 0, 6], ["steel-curl", 0, 8],
      ["dawn-bolt", 75, 5]
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

it("pins the ruled stage payloads — every selfStages row, transcribed from the rulings", () => {
  expect(MOVES.filter((m) => m.selfStages !== undefined).map((m) => [m.id, m.selfStages])).toEqual([
    ["center", { spa: 1, spd: 1 }],
    ["war-cry", { atk: 1 }],
    ["focus-mind", { spa: 1 }],
    ["stone-stance", { def: 1, spd: 1 }],
    ["rally", { atk: 1, def: 1 }],
    ["quickstep", { eva: 1 }],
    ["fade-step", { eva: 1 }],
    ["ghost-step", { eva: 1 }],
    ["attune", { atk: 1 }],
    ["deep-attune", { atk: 1, spa: 1 }],
    ["soul-attune", { atk: 2, spa: 2 }],
    ["curl", { def: 1 }],
    ["iron-curl", { def: 1, spd: 1 }],
    ["steel-curl", { def: 2, spd: 2 }]
  ])
})

it("pins the foeStages payloads — debuffs that ride the hit", () => {
  expect(MOVES.filter((m) => m.foeStages !== undefined).map((m) => [m.id, m.foeStages])).toEqual([
    ["fade-step", { acc: -1 }],
    ["ghost-step", { acc: -1 }]
  ])
})

it("pins the new fields' rulings — pen values, and Ghost-Step's declared accuracy", () => {
  expect(MOVES.filter((m) => m.pen !== undefined).map((m) => [m.id, m.pen])).toEqual([
    ["fang-barrage", 15],
    ["ghost-step", 10]
  ])
  expect(MOVES.find((m) => m.id === "ghost-step")!.accuracy).toBe(100)
})