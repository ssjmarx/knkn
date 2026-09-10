/**
 * The moves door — the game's move instances as one checked, literal-preserving table.
 * Declares the Move contract and its unions; rows are TS-authored (as const satisfies) so ids stay literal and MoveId derives.
 * Lab B authors the 24 shared moves; ladders (Lab C) and the battle engine (U8) cite rows by MoveId.
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
  priority?: number
  hits?: number
  drain?: number
  heal?: number
  status?: StatusKind
  statusChance?: number
  aoe?: true
  selfStages?: Partial<Record<StageKey, number>>
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
  { id: "rally", name: "Rally", type: "spirit", category: "support", weight: 6, selfStages: { atk: 1, def: 1 } }
] as const satisfies readonly Move[]

/** The move table as uniform Move rows — the view every consumer iterates. */
export const MOVES: readonly Move[] = MOVE_ROWS

/** Every move id as one literal union — the foreign key ladders and loadouts cite. */
export type MoveId = typeof MOVE_ROWS[number]["id"]