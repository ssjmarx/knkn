/**
 * The test scene's dialogue content — the two villagers' greetings and gossip, and the fox's bark tree.
 * Exports const Dialogue tables covering every Dialogue feature: conditions, choices, flag reads and writes, callbacks.
 * GameScene attaches these to NPCs; DialogueSystem renders whatever they describe.
 */
import { setFlag, hasFlag, getFlag, Flags } from "./flags"
import type { Dialogue } from "./dialogue"

const npc1_facts = [
  "She's from a nearby kingdom.",
  "She's not actually a knight though.",
  "She's a pottery instructor.",
  "She bought that armor for a convention."
]

const npc2_facts = [
  "He's from a faraway forest.",
  "He's an elf, but don't let that fool you.",
  "He's never lived in the forest.",
  "He's actually an accountant."
]

// NPC1 - greets and gives multiple facts
export const npc1_chat: Dialogue[] = [
  {
    text: "Howdy!",
    condition: (flags) => !hasFlag(flags, "spoke_npc1"),
    onComplete: (flags) => setFlag(flags, "spoke_npc1", true)
  },
  {
    text: "Have you met my friend?",
    condition: (flags) => !hasFlag(flags, "spoke_npc2")
  },
  {
    text: (flags) => {
      const visits = getFlag(flags, "npc1_visits", 0)
      return npc1_facts[Math.min(visits, npc1_facts.length - 1)]!
    },
    condition: (flags) => hasFlag(flags, "spoke_npc2"),
    onComplete: (flags) => setFlag(flags, "npc1_visits", getFlag(flags, "npc1_visits", 0) + 1)
  }
]

// NPC2 - greets and gives multiple facts
export const npc2_chat: Dialogue[] = [
  {
    text: "Hello.",
    condition: (flags) => !hasFlag(flags, "spoke_npc2"),
    onComplete: (flags) => setFlag(flags, "spoke_npc2", true)
  },
  {
    text: "Have you met my friend?",
    condition: (flags) => !hasFlag(flags, "spoke_npc1")
  },
  {
    text: (flags) => {
      const visits = getFlag(flags, "npc2_visits", 0)
      return npc2_facts[Math.min(visits, npc2_facts.length - 1)]!
    },
    condition: (flags) => hasFlag(flags, "spoke_npc1"),
    onComplete: (flags) => setFlag(flags, "npc2_visits", getFlag(flags, "npc2_visits", 0) + 1)
  }
]

export const fox_bark: Dialogue[] = [
  { text: "I'm a fox." },
  {
    text: "Do you like foxes?",
    choices: [
      { text: "Yes.", flag: "fox_liked", value: true },
      { text: "No.", flag: "fox_liked", value: false }
    ]
  },
  {
    text: (flags: Flags) => getFlag(flags, "fox_liked", false)
      ? "I like you."
      : "That's too bad."
  }
]