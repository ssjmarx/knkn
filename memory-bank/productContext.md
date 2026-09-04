# Product Context — why KON KON exists

> KON KON has two products: a game, and a game developer. The developer comes first.

## Primary purpose: a learning project

This repo is a **solo-dev education in TypeScript and game development, with the game as the curriculum.** The course is `syllabus.md` — "KON KON 101, Department of Solo Game Development, Phaser/TypeScript track":

- **The human types every line of code, runs every command, configures everything, makes every asset.** Every new file gets a full walkthrough — what each line does, why it's written that way, and which TypeScript concept it exercises. Nothing appears in the codebase that hasn't been studied first.
- **Honesty clause:** a 2–3 year course at solo-dev pace, structured so **every semester ends with something deployed and fun.** Solo devs don't die from hard work; they die from six months without anything to show. This project will never do that to its developer.
- **The hidden curriculum is the TypeScript progression:** types → functions → interfaces → classes/modules → unions → narrowing → generics → utility types → discriminated unions → `never`/exhaustiveness → pure state machines → serialization → async/event systems → defensive programming → tooling types. The game *is* a stack of type-shaped problems: commands that are one-of-several-kinds, tables that must validate, states that must transition legally.
- **Lesson format, every unit:** lecture → lab (line-by-line, in chat) → break-it-on-purpose → challenge → commit & deploy.

The AI agent's role: **instructor and reviewer only** — see `.clinerules`. The agent never writes project code, never runs project commands, never makes assets.

## The game's purpose

- **The pitch:** *A monster-taming JRPG with a single shape-shifting partner. Roam a post-scarcity Americana countryside, earn the eight planetary stones in any order, and master every form of the fox who chose you.*
- **The fantasy it sells:** mastery instead of capture. The completion track is the fox's own body — nine tails, one per mastered stone. The emotional thesis (the Matriarch's answer): *the mortal world is worth staying for.*
- **Audience & feel:** players who want GBC-energy JRPG comfort with modern freedom — "GBC energy on a modern screen," explicitly not emulation. Playable on desktop web from week one; phone-perfect by the vertical slice (Milestone 3).
- **Delivery philosophy:** web-first; every milestone deployed to the human's website so "is it fun yet?" is always one click away. Distribution doors stay open — Steam later via a Tauri/Electron wrapper, app stores via Capacitor or Tauri 2 — decided deliberately in Semester 4, not before.
