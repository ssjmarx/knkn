/**
 * The ladders door — each stone's move-unlock timeline, M15 to M235, as authored events.
 * Declares UnlockEvent; every event cites a MoveId, so unlock typos are compile errors.
 * The Record demands all eight stones; the gate test and the pacing pins hold the laws.
 */
import type { MoveId } from "./moves"
import type { StoneId } from "./stones"

/** One unlock: at this mastery, this move joins the kit. */
export interface UnlockEvent {
  mastery: number
  move: MoveId
}

// Model B (ruled 2026-09-10): crowned originals are the M255 capstones (stones.ts), never ladder events.
// Timings are provisional — the semi-originals (U18) will densify the middles.
const LADDER_ROWS = {
  // sol — the sustaining duelist
  sol: [
    { mastery: 15, move: "sun-flare" },
    { mastery: 55, move: "renew" },
    { mastery: 155, move: "leech-bite" },
    { mastery: 235, move: "center" }
  ],
  // luna — the phantom; no AoE, ever
  luna: [
    { mastery: 15, move: "glare-gaze" },
    { mastery: 95, move: "center" },
    { mastery: 235, move: "endure" }
  ],
  // mercury — the assassin; the AoE at M175 is the ruled exception
  mercury: [
    { mastery: 15, move: "nip" },
    { mastery: 75, move: "twin-bite" },
    { mastery: 175, move: "scatter-gust" },
    { mastery: 235, move: "ricochet-dart" }
  ],
  // venus — the attrition enchantress
  venus: [
    { mastery: 15, move: "sleep-pollen" },
    { mastery: 75, move: "leech-bite" },
    { mastery: 115, move: "spore-cloud" },
    { mastery: 235, move: "renew" }
  ],
  // mars — the glass cannon
  mars: [
    { mastery: 15, move: "cinder-bite" },
    { mastery: 95, move: "rally" },
    { mastery: 155, move: "twin-bite" },
    { mastery: 235, move: "cleave-storm" }
  ],
  // jupiter — the delete button loads late (sky-rend P105 respects the M200 power gate)
  jupiter: [
    { mastery: 15, move: "daze-snap" },
    { mastery: 105, move: "center" },
    { mastery: 235, move: "sky-rend" }
  ],
  // saturn — inevitability; acts-last tech
  saturn: [
    { mastery: 15, move: "endure" },
    { mastery: 95, move: "ward-stance" },
    { mastery: 235, move: "reap" }
  ],
  // terra — the bulwark
  terra: [
    { mastery: 15, move: "ward-stance" },
    { mastery: 75, move: "endure" },
    { mastery: 115, move: "fissure-wave" },
    { mastery: 235, move: "renew" }
  ]
} as const satisfies Record<StoneId, readonly UnlockEvent[]>

/** The ladders as the uniform view — keyed by stone, all eight. */
export const LADDERS: Record<StoneId, readonly UnlockEvent[]> = LADDER_ROWS