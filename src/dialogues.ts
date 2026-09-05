// src/dialogues.ts

import { Flags, Dialogue, DialogueChoice } from "./dialogue"

// Simple dialogue (just text)
export const npc_greeting: Dialogue[] = [
  {
    text: "Welcome to the Commonweal!",
  },
  {
    text: "What brings you here today?"
  }
]

// Dialogue with choices
export const quest_offer: Dialogue[] = [
  {
    text: "Ah, a traveler! I have a task for you.",
    choices: [
      {
        text: "I'm listening.",
        flag: "quest_accepted",
        value: true,
      },
      {
        text: "Not right now.",
      }
    ]
  },
  {
    text: "I was hoping you'd say that!"
  }
]

// Conditional dialogue (only shows if player has flag)
export const npc_remember: Dialogue[] = [
  {
    text: "Have we met before?",
    choices: [
      {
        text: "Yes, I remember you.",
        flag: "npc_remembered",
        value: true,
      },
      {
        text: "No, I think this is our first time.",
      }
    ]
  },
  {
    text: "Ah, you're back! How have you been?"
  }
]

// Conditional dialogue (shows different response based on flag)
export const npc_with_item: Dialogue[] = [
  {
    text: "Do you have the key I asked for?",
    choices: [
      {
        text: "Here you go.",
        flag: "item_given",
        value: true,
      },
      {
        text: "Not yet.",
      }
    ]
  },
  {
    text: (flags: Flags) => {
      if (flags["item_given"]) {
        return "Thank you! The door is now open."
      }
      return "Please bring it when you can."
    },
    onComplete: (flags: Flags) => {
      if (flags["item_given"]) {
        console.log("Player gave the item!")
      }
    }
  }
]

// Dialogue with callback (runs when dialogue ends)
export const town_intro: Dialogue[] = [
  {
    text: "You've arrived at the Commonweal.",
    onComplete: (flags: Flags) => {
      console.log("Player entered town!")
    }
  },
  {
    text: "It's a peaceful place."
  },
  {
    text: "Use the A button to advance."
  }
]

// Complex dialogue with multiple branches
export const merchant: Dialogue[] = [
  {
    text: "Welcome, traveler!",
  },
  {
    text: "Can I help you with anything?",
    choices: [
      {
        text: "Do you have anything for sale?",
        flag: "merchant_shopping",
        value: true,
      },
      {
        text: "Just looking around.",
      }
    ]
  },
  {
    text: (flags: Flags) => {
      if (flags["merchant_shopping"]) {
        return "I have some items in stock. Take a look!"
      }
      return "Feel free to browse."
    }
  }
]

// Simple string array (converted to Dialogue internally)
export const simple_npc: string[] = [
  "Hello there!",
  "How are you today?"
]
