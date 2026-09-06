/**
 * The PC sheet's shared geometry — column count and the facing-row lookup.
 * One home for the frame math Player and Npc both perform, so the two can never disagree.
 * Any actor drawn from the Super Retro World character sheet imports these.
 */
import type { Direction } from "../core/input"

export const SHEET_COLUMNS = 9

export const ROW_INDEX: Record<Direction, number> = { down: 0, left: 1, right: 2, up: 3 }