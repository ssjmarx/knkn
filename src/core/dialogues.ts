/**
 * The game's dialogue content — sample conversations exercising every Dialogue feature.
 * Exports const tables of Dialogue (plus one string[]) covering plain text, choices, flag reads, and callbacks.
 * GameScene attaches these to trigger rectangles; DialogueSystem renders whatever they describe.
 */
import { setFlag, hasFlag } from "./flags"
import type { Dialogue } from "./dialogue"

// NPC1 — greets, then reacts to whether you've met NPC2
export const npc1_chat: Dialogue[] = [
  {
    text: "Howdy!",
    onComplete: (flags) => setFlag(flags, "spoke_npc1", true)
  },
  {
    text: (flags) => hasFlag(flags, "spoke_npc2")
      ? "Pleased to meet you!"
      : "Have you met my friend, NPC2?"
  }
]

// NPC2 — greets, then reacts to whether you've met NPC1
export const npc2_chat: Dialogue[] = [
  {
    text: "Hello.",
    onComplete: (flags) => setFlag(flags, "spoke_npc2", true)
  },
  {
    text: (flags) => hasFlag(flags, "spoke_npc1")
      ? "It's nice to meet you."
      : "This is my friend, NPC1."
  }
]