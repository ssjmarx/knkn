// src/dialogue.ts

import type { Flags } from "./flags"

export type DialogueChoice = {
  text: string
  flag?: string
  value?: boolean | number | string
}

export type Dialogue = {
  text: string | ((flags: Flags) => string)
  choices?: DialogueChoice[]
  onComplete?: (flags: Flags) => void
}