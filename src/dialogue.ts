// src/dialogue.ts

export type Flags = Record<string, boolean | number | string>

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

// Helper function to check if something is a Dialogue array
export function isDialogue(
  lines: unknown
): lines is Dialogue[] {
  if (!Array.isArray(lines)) return false
  if (lines.length === 0) return false
  
  const first = lines[0]
  return (
    typeof first === 'object' &&
    first !== null &&
    'text' in first
  )
}

// Helper to check if a single line is a Dialogue object
export function isDialogueLine(line: unknown): line is Dialogue {
  if (typeof line !== 'object' || line === null) return false
  const obj = line as Record<string, unknown>
  return 'text' in obj
}
