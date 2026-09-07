/**
 * The stat-stage multipliers — the exact ±6 stage table the battle math multiplies stats by.
 * One home for the table's generating rule; damage math and accuracy math both consume it.
 * The table is ruled canon — the pasted fractions are pinned verbatim by the test suite.
 */

/** The stage multiplier: (2+s)/2 at zero and above, 2/(2−s) below — the ruled table, generated. */
export function stageMultiplier(stage: number): number {
  return stage >= 0 ? (stage + 2) / 2 : 2 / (2 - stage)
}