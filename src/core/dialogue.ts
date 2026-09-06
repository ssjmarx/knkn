/**
 * The data shapes for conversations — lines, choices, and completion callbacks.
 * Declares Dialogue and DialogueChoice as plain data, with optional flag effects and per-line callbacks.
 * dialogues.ts authors content in these shapes; DialogueSystem consumes them at runtime.
 */
import type { Flags } from "../core/flags"

export type DialogueChoice = {
  text: string
  flag?: string
  value?: boolean | number | string
}

export type Dialogue = {
  text: string | ((flags: Flags) => string)
  condition?: (flags: Flags) => boolean
  choices?: DialogueChoice[]
  onComplete?: (flags: Flags) => void
}