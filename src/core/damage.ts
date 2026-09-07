/**
 * The damage formula — the pure §7.2 math plus the ruled damage roll, composed into one hit's damage.
 * Stages both stats, applies penetration to the staged defense, then rolls 85–100% at the final step.
 * The HP ledger rounds to integers in U8; the matchup sweep and Rule-of-500 tests inject their own dice.
 */

import { stageMultiplier } from "./stages"

/** One damage computation: the actors' stats, the move's power and penetration, the attacker's level. */
export type DamageInput = {
  level: number
  power: number
  attack: number
  defense: number
  attackStage?: number
  defenseStage?: number
  pen?: number
}

/** A die: a uniform random integer in [min, max], inclusive — the one impurity the battle math needs, injected by the caller. */
export type Die = (min: number, max: number) => number

const ROLL_MIN = 85
const ROLL_MAX = 100

/** The damage of one hit: ((2L/5 + 2) × Power × A / (D × (1 − Pen))) / 50 + 2, all × the roll — staged, rolled, exact float out. */
export function damage(input: DamageInput, die: Die): number {
  const attack = input.attack * stageMultiplier(input.attackStage ?? 0)
  const defense = input.defense * stageMultiplier(input.defenseStage ?? 0) * (1 - (input.pen ?? 0))
  const levelTerm = (2 * input.level) / 5 + 2
  const scaled = (levelTerm * input.power * attack) / defense / 50
  const roll = die(ROLL_MIN, ROLL_MAX)
  return (scaled + 2) * (roll / 100)
}

/** Hits to knock out: the HP pool divided by per-hit damage, rounded up to a whole hit. */
export function hitsToKo(hp: number, perHit: number): number {
  return Math.ceil(hp / perHit)
}