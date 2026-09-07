/**
 * The stat and HP formulas — the pure level math every spirit in the game shares.
 * Grows a stat cap along a growth curve into the actual stat, clamped at the 255 ceiling; HP stays level-derived.
 * The damage module, the forms table, and the matchup tests consume these; nothing here knows Phaser.
 */

const LEVEL_CAP = 255
const STAT_CEILING = 255
const HP_BASE = 5
const HP_PER_LEVEL = 4

/** A growth curve: the share of its cap a spirit is born with, and how the rest arrives with level. */
export type GrowthCurve = { start: number, exponent: number }

/** The fox's curve — born at half its caps, growing straight to them by L255. */
export const FOX_CURVE: GrowthCurve = { start: 0.5, exponent: 1 }

/** The actual stat at a level: the cap grown along the curve, floored, clamped to the 255 ceiling. */
export function actualStat(cap: number, level: number, curve: GrowthCurve): number {
  const growth = curve.start + (1 - curve.start) * Math.pow(level / LEVEL_CAP, curve.exponent)
  return Math.min(STAT_CEILING, Math.floor(cap * growth))
}

/** Maximum HP at a level: 5 + 4L — level-derived only, identical across every form and spirit. */
export function maxHp(level: number): number {
  return HP_BASE + HP_PER_LEVEL * level
}