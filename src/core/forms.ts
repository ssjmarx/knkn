/**
 * The fox forms table — the nine stat sheets as plain data, cap-shaped by the sheet-as-cap ruling.
 * Each form carries its five stat caps; BST 750 across every row is the table's invariant.
 * actualStat grows these caps along a spirit's curve; the matchup sweep reads the whole roster.
 */

/** The five battle stats, by key — the shape every stat sheet must complete. */
export type StatKey = "atk" | "def" | "spa" | "spd" | "spe"

/** One form's stat caps: every StatKey, exactly once. */
export type StatCaps = Record<StatKey, number>

/** One form of the fox — a code id, a display name, and its stat caps. */
export type Form = {
  id: string
  name: string
  caps: StatCaps
}

export const FOX_FORMS: readonly Form[] = [
  { id: "base", name: "Base", caps: { atk: 150, def: 140, spa: 150, spd: 140, spe: 170 } },
  { id: "sol", name: "Sol", caps: { atk: 125, def: 130, spa: 175, spd: 165, spe: 155 } },
  { id: "luna", name: "Luna", caps: { atk: 100, def: 135, spa: 160, spd: 165, spe: 190 } },
  { id: "mercury", name: "Mercury", caps: { atk: 180, def: 120, spa: 110, spd: 140, spe: 200 } },
  { id: "venus", name: "Venus", caps: { atk: 115, def: 145, spa: 170, spd: 165, spe: 155 } },
  { id: "mars", name: "Mars", caps: { atk: 200, def: 110, spa: 130, spd: 135, spe: 175 } },
  { id: "jupiter", name: "Jupiter", caps: { atk: 125, def: 120, spa: 200, spd: 140, spe: 165 } },
  { id: "saturn", name: "Saturn", caps: { atk: 145, def: 175, spa: 145, spd: 175, spe: 110 } },
  { id: "terra", name: "Terra", caps: { atk: 170, def: 200, spa: 105, spd: 160, spe: 115 } }
]