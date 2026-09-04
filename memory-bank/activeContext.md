# Active Context — where we are right now

> The living file. Future agents: read this after the brief/context files; update it at session end. Date every entry. Facts only.

## Current state (2026-09-03)

- **Phase: pre-Unit 0.** No code, no git repo, no dependencies. The repo contains only:
  - `planning/` — the original design lock v1.0 (`outline`) and course syllabus (`syllabus`); the historical source of record
  - `memory-bank/` — this bank (the AI's authoritative source), seeded 2026-09-03: six distilled files + two verbatim canon mirrors (`design.md`, `syllabus.md`)
  - `.clinerules` — AI guardrails: learning project; the agent writes only memory-bank files; read the full bank before any task
- The human does **all** implementation themselves. The agent teaches, reviews, and maintains this bank — nothing else.

## What's next (the human's solo work — Unit 0)

Per `syllabus.md` Unit 0: Node (LTS — machine currently has non-LTS v25.5.0; consider switching) → VS Code + the three extensions that matter → create the repo (`git init`, branch `main`) with a **real git identity** (the current global config is a placeholder) → scaffold Vite + Phaser + TypeScript by hand → a tsconfig that makes sense → a fox sprite on a magenta screen ("Hello Kon Kon") → push → deploy to the website. **Done when:** "Hello Kon Kon" is live.

## Open decisions (✎ — the human's, never the agent's)

From `design.md` §17:
1. Working title: **KON KON** / *Nine Stones* / *The Long Hum* / *Commonweal*
2. Country name sign-off ("the Commonweal") and isles name ("Halcyon")
3. Epilogue trigger formalized: nine tails (all 8 mastered) → Sun Road base scene; Deep Roots lore found en route
4. Pilgrim's eight phase-lines — "the game's best 80 words," to be written as a set

Infrastructure (added 2026-09-03):
5. Deploy target (GitHub Pages / Netlify / Vercel / Cloudflare Pages) — affects the Vite `base` path and CI deploy job
6. Whether to rename `planning/outline` and `planning/syllabus` to `.md` extensions (GitHub renders extensionless files as plain text) — human's call; the bank mirrors are `.md` regardless

## Watch items / reminders

- Placeholder git identity must be fixed before the first commit
- Vite `base` path depends on the deploy choice
- Node non-LTS vs the syllabus's LTS preference
- Design watch items live in the Prototype Watchlist (`design.md` §16) — relevant once battles exist; anything touching the Wane economy is auto-added

## Session protocol

At the end of every session: update this file and `progress.md` (dated, factual). Record rulings in the canon mirrors (`design.md`, `syllabus.md`) only when the human issues them. Full rules: `.clinerules`.
