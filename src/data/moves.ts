/**
 * The moves door — the game's move instances as one checked, literal-preserving table.
 * Declares the Move contract and its unions; rows are TS-authored (as const satisfies) so ids stay literal and MoveId derives.
 * 54 rows — Lab B's 37 shared plus Lab C's 17 stone originals & capstones; ladders and U8 cite by MoveId.
 */
import type { SpiritType } from "./typechart"
import type { StatKey } from "./forms"

/** The three damage channels — physical, special, or no damage at all. */
export type MoveCategory = "atk" | "spa" | "support"

/** The stageable stats — the five battle stats plus accuracy and evasion. */
export type StageKey = StatKey | "acc" | "eva"

/** The seven battle statuses (design §7.3), declared whole for the rows that carry them. */
export type StatusKind = "daze" | "sleep" | "aflame" | "blind" | "bound" | "doom" | "dwindle"

/** One usable move — identity and weight always; every effect field optional, present only when the row has it. */
export interface Move {
  id: string
  name: string
  type: SpiritType
  category: MoveCategory
  weight: number
  power?: number
  accuracy?: number
  pen?: number
  priority?: number
  hits?: number
  drain?: number
  recoil?: number
  heal?: number
  status?: StatusKind
  statusChance?: number
  aoe?: true
  selfStages?: Partial<Record<StageKey, number>>
  foeStages?: Partial<Record<StageKey, number>>
}

const MOVE_ROWS = [
  // — the eight elemental strikes (§6.2: 70/0/5) —
  { id: "sun-spark", name: "Sun-Spark", type: "sol", category: "spa", power: 70, weight: 5 },
  { id: "dew-lance", name: "Dew-Lance", type: "luna", category: "spa", power: 70, weight: 5 },
  { id: "gust-cut", name: "Gust-Cut", type: "mercury", category: "atk", power: 70, weight: 5 },
  { id: "bloom-whip", name: "Bloom-Whip", type: "venus", category: "spa", power: 70, weight: 5 },
  { id: "ember-bite", name: "Ember-Bite", type: "mars", category: "atk", power: 70, weight: 5 },
  { id: "spark-snap", name: "Spark-Snap", type: "jupiter", category: "spa", power: 70, weight: 5 },
  { id: "hour-blade", name: "Hour-Blade", type: "saturn", category: "atk", power: 70, weight: 5 },
  { id: "root-whip", name: "Root-Whip", type: "terra", category: "atk", power: 70, weight: 5 },
  // — the four status carriers (60/30%/6) —
  { id: "daze-snap", name: "Daze-Snap", type: "jupiter", category: "spa", power: 60, weight: 6, status: "daze", statusChance: 30 }, 
  { id: "sleep-pollen", name: "Sleep-Pollen", type: "venus", category: "spa", power: 60, weight: 6, status: "sleep", statusChance: 30 },
  { id: "cinder-bite", name: "Cinder-Bite", type: "mars", category: "atk", power: 60, weight: 6, status: "aflame", statusChance: 30 },
  { id: "glare-gaze", name: "Glare-Gaze", type: "luna", category: "spa", power: 60, weight: 6, status: "blind", statusChance: 30 },
  // — utility —
  { id: "renew", name: "Renew", type: "spirit", category: "support", weight: 10, heal: 50 },
  { id: "ward-stance", name: "Ward-Stance", type: "spirit", category: "support", weight: 6 }, 
  { id: "endure", name: "Endure", type: "spirit", category: "support", weight: 4 },
  { id: "center", name: "Center", type: "spirit", category: "support", weight: 4, selfStages: { spa: 1, spd: 1 } }, 
  { id: "nip", name: "Nip", type: "spirit", category: "atk", power: 35, weight: 2, priority: 1 },
  { id: "twin-bite", name: "Twin-Bite", type: "spirit", category: "atk", power: 35, weight: 3, hits: 2 }, 
  { id: "leech-bite", name: "Leech-Bite", type: "spirit", category: "atk", power: 50, weight: 5, drain: 33 }, 
  { id: "scatter-gust", name: "Scatter-Gust", type: "mercury", category: "spa", power: 45, weight: 5, aoe: true },
  // — setup (wt4 each; Rally wt6, Spirit) —
  { id: "war-cry", name: "War-Cry", type: "spirit", category: "support", weight: 4, selfStages: { atk: 1 } },
  { id: "focus-mind", name: "Focus-Mind", type: "spirit", category: "support", weight: 4, selfStages: { spa: 1 } },
  { id: "stone-stance", name: "Stone-Stance", type: "spirit", category: "support", weight: 4, selfStages: { def: 1, spd: 1 } },
  { id: "rally", name: "Rally", type: "spirit", category: "support", weight: 6, selfStages: { atk: 1, def: 1 } },
  { id: "strike", name: "Strike", type: "spirit", category: "atk", power: 50, weight: 3 },
  { id: "fang-barrage", name: "Fang-Barrage", type: "spirit", category: "atk", power: 75, pen: 15, weight: 5 },
  { id: "true-strike", name: "True-Strike", type: "spirit", category: "atk", power: 95, weight: 8 },
  { id: "quickstep", name: "Quickstep", type: "spirit", category: "atk", power: 40, weight: 2, selfStages: { eva: 1 } },
  { id: "fade-step", name: "Fade-Step", type: "spirit", category: "atk", power: 50, weight: 3, foeStages: { acc: -1 }, selfStages: { eva: 1 } },
  { id: "ghost-step", name: "Ghost-Step", type: "spirit", category: "atk", power: 60, accuracy: 100, priority: 1, pen: 10, weight: 8, foeStages: { acc: -1 }, selfStages: { eva: 1 } },
  { id: "attune", name: "Attune", type: "spirit", category: "support", weight: 4, selfStages: { atk: 1 } },
  { id: "deep-attune", name: "Deep-Attune", type: "spirit", category: "support", weight: 6, selfStages: { atk: 1, spa: 1 } },
  { id: "soul-attune", name: "Soul-Attune", type: "spirit", category: "support", weight: 8, selfStages: { atk: 2, spa: 2 } },
  { id: "curl", name: "Curl", type: "spirit", category: "support", weight: 4, selfStages: { def: 1 } },
  { id: "iron-curl", name: "Iron-Curl", type: "spirit", category: "support", weight: 6, selfStages: { def: 1, spd: 1 } },
  { id: "steel-curl", name: "Steel-Curl", type: "spirit", category: "support", weight: 8, selfStages: { def: 2, spd: 2 } },
  { id: "dawn-bolt", name: "Dawn-Bolt", type: "sol", category: "spa", power: 75, weight: 5 },
  // — the eight crowned originals (§6.3 capstone column — canon stats; field synergies are U8 comments) —
  { id: "sun-lance", name: "Sun-Lance", type: "sol", category: "spa", power: 90, pen: 15, weight: 8 }, // Sun-Dawn: Pen 30
  { id: "dream-bite", name: "Dream-Bite", type: "luna", category: "spa", power: 80, weight: 6, status: "sleep", statusChance: 20 }, // Moon-Veil: 35% sleep
  { id: "foxfire-split", name: "Foxfire Split", type: "mercury", category: "support", weight: 6 }, // 1→2 bodies, slot-occupied (§7.6)
  { id: "sweet-drain", name: "Sweet-Drain", type: "venus", category: "spa", power: 75, drain: 50, weight: 6 }, // Bloom-Hush: heal 75%
  { id: "reckless-cleave", name: "Reckless Cleave", type: "mars", category: "atk", power: 110, recoil: 25, weight: 10 }, // Ember-Wake: 30% Aflame
  { id: "sky-fall", name: "Sky-Fall", type: "jupiter", category: "spa", power: 120, weight: 12 }, // Storm-Sky: never misses
  { id: "reapers-toll", name: "Reaper's Toll", type: "saturn", category: "spa", power: 70, status: "doom", statusChance: 100, weight: 8 }, // Doom-3; Grey-Hush: Doom-2
  { id: "quake-step", name: "Quake-Step", type: "terra", category: "atk", power: 95, weight: 9 }, // Deep-Soil: −1 Spe on hit
  // — second originals + the Mercury capstone (§6.3/§7.6 — provisional stats: §6.1 template grammar × §5.2 identity) —
  { id: "sun-flare", name: "Sun-Flare", type: "sol", category: "spa", power: 70, weight: 6, status: "blind", statusChance: 30 }, // provisional — T7 grammar
  { id: "moon-double", name: "Moon-Double", type: "luna", category: "spa", power: 45, hits: 2, weight: 5 }, // provisional — the phantom's double-strike
  { id: "ricochet-dart", name: "Ricochet-Dart", type: "mercury", category: "atk", power: 45, hits: 2, priority: 1, weight: 4 }, // provisional — T4/T11 grammar
  { id: "spore-cloud", name: "Spore-Cloud", type: "venus", category: "spa", power: 50, aoe: true, weight: 6, status: "sleep", statusChance: 30 }, // provisional — the Venus AoE
  { id: "cleave-storm", name: "Cleave-Storm", type: "mars", category: "atk", power: 45, hits: 3, weight: 7 }, // provisional — the glass-cannon flurry
  { id: "sky-rend", name: "Sky-Rend", type: "jupiter", category: "spa", power: 105, accuracy: 85, weight: 8 }, // provisional — T3 Heavy grammar
  { id: "reap", name: "Reap", type: "saturn", category: "atk", power: 65, drain: 33, weight: 5 }, // provisional — T6 grammar
  { id: "fissure-wave", name: "Fissure-Wave", type: "terra", category: "atk", power: 60, aoe: true, weight: 6 }, // provisional — the Terra AoE
  { id: "multitude", name: "Multitude", type: "mercury", category: "support", weight: 8 } // the M255 capstone: Split → 1→3
] as const satisfies readonly Move[]

/** The move table as uniform Move rows — the view every consumer iterates. */
export const MOVES: readonly Move[] = MOVE_ROWS

/** Every move id as one literal union — the foreign key ladders and loadouts cite. */
export type MoveId = typeof MOVE_ROWS[number]["id"]