/**
 * The stones door — the eight planetary stones as identity plus kit citations.
 * Declares the Stone contract; rows cite MoveIds so every kit citation compile-checks.
 * Ladders (ladders.ts) time each kit's unlocks; the engine (U8) reads fields by stone id.
 */
import type { MoveId } from "./moves"

/** One planetary stone — its identity, its overworld flavor, and the moves its kit is built from. */
export interface Stone {
  id: string
  name: string
  town: string
  verb: string
  field: string
  free: readonly MoveId[]
  originals: readonly MoveId[]
  capstone: MoveId
}

// Towns: design §3 · verbs: §11 · fields: §7.5 · kits: §6.3. Canon quirks kept faithful:
// Moon-Double and Foxfire Split are each listed as both a free move and an original (§6.3).
// Model B (ruled 2026-09-10): the capstone is the crowned original — an M255 unlock cited here, never a ladder event.
const STONE_ROWS = [
  { id: "sol", name: "Sol", town: "Heliotrope", verb: "Dawn-Lantern", field: "Sun-Dawn", free: ["dawn-bolt", "focus-mind"], originals: ["sun-lance", "sun-flare"], capstone: "sun-lance" },
  { id: "luna", name: "Luna", town: "Vesper Bayou", verb: "Moon-Path", field: "Moon-Veil", free: ["moon-double", "dew-lance"], originals: ["dream-bite", "moon-double"], capstone: "dream-bite" },
  { id: "mercury", name: "Mercury", town: "Wayfare", verb: "Gale-Dash", field: "Gale-Run", free: ["foxfire-split", "gust-cut"], originals: ["foxfire-split", "ricochet-dart"], capstone: "multitude" },
  // Venus's town is provisional — unnamed in canon (✎); "Honeysuckle" holds the seat until ruled.
  { id: "venus", name: "Venus", town: "Honeysuckle", verb: "Bloom-Weave", field: "Bloom-Hush", free: ["bloom-whip", "stone-stance"], originals: ["sweet-drain", "spore-cloud"], capstone: "sweet-drain" },
  { id: "mars", name: "Mars", town: "Foundry", verb: "Cinder-Cut", field: "Ember-Wake", free: ["ember-bite", "war-cry"], originals: ["reckless-cleave", "cleave-storm"], capstone: "reckless-cleave" },
  { id: "jupiter", name: "Jupiter", town: "Thunder Hollow", verb: "Storm-Call", field: "Storm-Sky", free: ["spark-snap", "focus-mind"], originals: ["sky-fall", "sky-rend"], capstone: "sky-fall" },
  { id: "saturn", name: "Saturn", town: "Sabbathday Mills", verb: "Hour-Turn", field: "Grey-Hush", free: ["hour-blade", "stone-stance"], originals: ["reapers-toll", "reap"], capstone: "reapers-toll" },
  { id: "terra", name: "Terra", town: "Motherlode", verb: "Burrow", field: "Deep-Soil", free: ["root-whip", "stone-stance"], originals: ["quake-step", "fissure-wave"], capstone: "quake-step" }
] as const satisfies readonly Stone[]

/** The stones as uniform rows — the view consumers iterate. */
export const STONES: readonly Stone[] = STONE_ROWS

/** Every stone id as one literal union — eight keys, deliberately not the nine-member SpiritType. */
export type StoneId = typeof STONE_ROWS[number]["id"]