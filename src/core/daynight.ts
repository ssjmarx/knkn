/**
 * The day/night tint table — a pure lookup from wall-clock hour to overlay color and strength.
 * No Phaser, no DOM: the phases are plain data, ready for Vitest when Unit 6 arrives.
 * GameScene asks every frame and paints the result onto its full-screen overlay.
 */

export type Tint = { color: number, alpha: number }

type Phase = { from: number, to: number, color: number, alpha: number }

const PHASES: Phase[] = [
  { from: 0, to: 5, color: 0x001030, alpha: 0.45 },
  { from: 5, to: 7, color: 0x68385c, alpha: 0.25 },
  { from: 7, to: 17, color: 0xffffff, alpha: 0 },
  { from: 17, to: 19, color: 0x885820, alpha: 0.18 },
  { from: 19, to: 21, color: 0x28284c, alpha: 0.35 },
  { from: 21, to: 24, color: 0x001030, alpha: 0.45 }
]

const DAY: Tint = { color: 0xffffff, alpha: 0 }

/** The overlay tint for a given hour (0–23); any hour no phase covers gets plain day. */
export function tintForHour(hour: number): Tint {
  const phase = PHASES.find((p) => hour >= p.from && hour < p.to)
  return phase ?? DAY
}