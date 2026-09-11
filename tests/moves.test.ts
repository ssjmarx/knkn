// The moves suite — the 54 canon-named moves: id pins, load-bearing numbers, schema-shape invariants,
// and the stones/ladders joins.
import { describe, it, expect } from "vitest"
import { MOVES } from "../src/data/moves"
import { STONES } from "../src/data/stones"
import { LADDERS } from "../src/data/ladders"

describe("the shared move table", () => {
  it("holds exactly the 54 canon-named moves, by id", () => {
    expect(MOVES.map((m) => m.id)).toEqual([
      "sun-spark", "dew-lance", "gust-cut", "bloom-whip", "ember-bite", "spark-snap", "hour-blade", "root-whip",
      "daze-snap", "sleep-pollen", "cinder-bite", "glare-gaze",
      "renew", "ward-stance", "endure", "center", "nip", "twin-bite", "leech-bite", "scatter-gust",
      "war-cry", "focus-mind", "stone-stance", "rally",
      "strike", "fang-barrage", "true-strike", "quickstep", "fade-step", "ghost-step",
      "attune", "deep-attune", "soul-attune",
      "curl", "iron-curl", "steel-curl",
      "dawn-bolt",
      "sun-lance", "dream-bite", "foxfire-split", "sweet-drain", "reckless-cleave", "sky-fall", "reapers-toll", "quake-step",
      "sun-flare", "moon-double", "ricochet-dart", "spore-cloud", "cleave-storm", "sky-rend", "reap", "fissure-wave",
      "multitude"
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
      ["dawn-bolt", 75, 5],
      ["sun-lance", 90, 8], ["dream-bite", 80, 6], ["foxfire-split", 0, 6], ["sweet-drain", 75, 6],
      ["reckless-cleave", 110, 10], ["sky-fall", 120, 12], ["reapers-toll", 70, 8], ["quake-step", 95, 9],
      ["sun-flare", 70, 6], ["moon-double", 45, 5], ["ricochet-dart", 45, 4], ["spore-cloud", 50, 6],
      ["cleave-storm", 45, 7], ["sky-rend", 105, 8], ["reap", 65, 5], ["fissure-wave", 60, 6],
      ["multitude", 0, 8]
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
      if (m.recoil !== undefined && (m.recoil < 1 || m.recoil > 100)) violations.push(`${m.id}: recoil ${m.recoil}`)
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

it("pins the new fields' rulings — pen and recoil values, and the declared accuracies", () => {
  expect(MOVES.filter((m) => m.pen !== undefined).map((m) => [m.id, m.pen])).toEqual([
    ["fang-barrage", 15],
    ["ghost-step", 10],
    ["sun-lance", 15]
  ])
  expect(MOVES.filter((m) => m.recoil !== undefined).map((m) => [m.id, m.recoil])).toEqual([
    ["reckless-cleave", 25]
  ])
  expect(MOVES.find((m) => m.id === "ghost-step")!.accuracy).toBe(100)
  expect(MOVES.find((m) => m.id === "sky-rend")!.accuracy).toBe(85)
})

describe("the stones door", () => {
  it("holds exactly the eight canon stones, by id", () => {
    expect(STONES.map((s) => s.id)).toEqual([
      "sol", "luna", "mercury", "venus", "mars", "jupiter", "saturn", "terra"
    ])
  })

  it("keeps the §6.1 accounting — two frees and two originals per stone, 16 originals total", () => {
    const violations: string[] = []
    for (const s of STONES) {
      if (s.free.length !== 2) violations.push(`${s.id}: ${s.free.length} frees`)
      if (s.originals.length !== 2) violations.push(`${s.id}: ${s.originals.length} originals`)
    }
    expect(violations).toEqual([])
    expect(new Set(STONES.flatMap((s) => s.originals)).size).toBe(16)
  })

  it("cites only real moves — frees, originals, and capstones all resolve", () => {
    const ids = new Set(MOVES.map((m) => m.id))
    const violations: string[] = []
    for (const s of STONES) {
      for (const id of [...s.free, ...s.originals, s.capstone]) {
        if (!ids.has(id)) violations.push(`${s.id}: ${id} not in MOVES`)
      }
    }
    expect(violations).toEqual([])
  })
})

describe("the ladders door", () => {
  it("keys all eight stones — the same ids as the stones door", () => {
    expect(Object.keys(LADDERS)).toEqual(STONES.map((s) => s.id))
  })

  it("spans exactly M15→M235 per stone — ascending, no repeated mastery", () => {
    const violations: string[] = []
    for (const [stone, events] of Object.entries(LADDERS)) {
      if (events.length === 0) { violations.push(`${stone}: empty ladder`); continue }
      const first = events[0]!
      const last = events[events.length - 1]!
      if (first.mastery !== 15) violations.push(`${stone}: opens at M${first.mastery}`)
      if (last.mastery !== 235) violations.push(`${stone}: tops at M${last.mastery}`)
      for (let i = 1; i < events.length; i++) {
        if (events[i]!.mastery <= events[i - 1]!.mastery) violations.push(`${stone}: M${events[i]!.mastery} out of order`)
      }
    }
    expect(violations).toEqual([])
  })

  it("keeps kits disjoint — frees never re-timed, capstones never ladder events, no double unlock", () => {
    const violations: string[] = []
    for (const [stoneId, events] of Object.entries(LADDERS)) {
      const stone = STONES.find((s) => s.id === stoneId)!
      const seen = new Set<string>()
      for (const e of events) {
        if (seen.has(e.move)) violations.push(`${stoneId}: ${e.move} unlocked twice`)
        seen.add(e.move)
        if (stone.free.includes(e.move)) violations.push(`${stoneId}: ${e.move} is free, re-timed at M${e.mastery}`)
        if (e.move === stone.capstone) violations.push(`${stoneId}: capstone ${e.move} in the ladder`)
      }
    }
    expect(violations).toEqual([])
  })

  it("unlocks only real moves", () => {
    const ids = new Set(MOVES.map((m) => m.id))
    const violations: string[] = []
    for (const [stone, events] of Object.entries(LADDERS)) {
      for (const e of events) if (!ids.has(e.move)) violations.push(`${stone}: ${e.move} not in MOVES`)
    }
    expect(violations).toEqual([])
  })

  it("paces AoE — unlocks only in the M95–115 window, Mercury at M175, Luna never", () => {
    const isAoe = (id: string) => MOVES.find((m) => m.id === id)!.aoe === true
    const violations: string[] = []
    for (const [stone, events] of Object.entries(LADDERS)) {
      for (const e of events) {
        if (!isAoe(e.move)) continue
        if (stone === "mercury") {
          if (e.mastery !== 175) violations.push(`mercury: ${e.move} at M${e.mastery}, not M175`)
        } else if (e.mastery < 95 || e.mastery > 115) {
          violations.push(`${stone}: ${e.move} at M${e.mastery}, outside the window`)
        }
      }
      if (stone === "luna" && events.some((e) => isAoe(e.move))) violations.push("luna: the phantom carries AoE")
    }
    expect(violations).toEqual([])
  })
})

// The ruled gate: no Power-100+ below this mastery, any stone, any door — M0 included.
const POWER_GATE_MASTERY = 200
const POWER_GATE_POWER = 100

/** The power of a cited move — the join the tables exist for. */
function powerOf(id: string): number {
  return MOVES.find((m) => m.id === id)!.power ?? 0
}

it("holds the power gate — no Power-100+ unlock below the threshold, none free", () => {
  const violations: string[] = []
  for (const [stone, events] of Object.entries(LADDERS)) {
    for (const event of events) {
      if (powerOf(event.move) >= POWER_GATE_POWER && event.mastery < POWER_GATE_MASTERY) {
        violations.push(`${stone}: ${event.move} at M${event.mastery}`)
      }
    }
  }
  for (const stone of STONES) {
    for (const id of stone.free) {
      if (powerOf(id) >= POWER_GATE_POWER) violations.push(`${stone.id}: ${id} free at M0`)
    }
  }
  expect(violations).toEqual([])
})
