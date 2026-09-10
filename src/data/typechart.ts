/**
 * The typechart door — the 8×8 attack/defense multipliers, imported from JSON and proven at compile time.
 * Declares SpiritType, the join key of the game's tables, and the TypeChart contract the JSON must satisfy.
 * Battle math reads multipliers from here once U8 arrives; the test suite pins the exact 64 cells as canon.
 */
import typechartJson from "./typechart.json"

/** The eight spirit types, one per stone — the join key every game table shares. */
export type SpiritType = "sol" | "luna" | "mercury" | "venus" | "mars" | "jupiter" | "saturn" | "terra"

/** The whole chart: every attacker's row and every defender's column, each exactly once. */
export type TypeChart = Record<SpiritType, Record<SpiritType, number>>

export const TYPECHART = typechartJson satisfies TypeChart