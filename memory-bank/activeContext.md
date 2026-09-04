# Active Context — where we are right now

> The living file. Future agents: read this after the brief/context files; update it at session end. Date every entry. Facts only.

## Current state (2026-09-03, post repo-init)

- **Phase: pre-Unit 0, just begun.** The repo is now a **git repository**: branch `master`, two commits, no remote, clean working tree.
  - `61285c6` — initial commit: `.clinerules`, the full memory bank, and the original `planning/` docs
  - `c84cc39` — `planning/` retired: deleted after being preserved in git history
- **The memory bank is the sole source of truth** for design and course canon. The mirrors (`design.md`, `syllabus.md`) are the only authoritative copies; `planning/` exists only in git history.
- Repo contents: `.clinerules` + `memory-bank/`. No code, no dependencies, no CI yet.
- The human does **all** implementation themselves. The agent teaches, reviews, and maintains this bank — nothing else.

## What's next (the human's solo work — rest of Unit 0)

1. **Fix git identity — before pushing anything.** Both existing commits carry the placeholder identity (`Your Name <your.email@example.com>`). Set real values, then rewrite the two commits (commands provided in chat, 2026-09-03).
2. *(Optional)* Rename branch `master` → `main` (`git branch -m master main`) if preferred.
3. Choose the deploy target (open decision #5) — it decides the Vite `base` path and the CI deploy job.
4. Consider switching Node from non-LTS v25.5.0 to the LTS line (the syllabus's preference).
5. VS Code + the three extensions that matter → scaffold Vite + Phaser + TypeScript by hand → a tsconfig that makes sense → a fox sprite on a magenta screen ("Hello Kon Kon") → push → deploy to the website. **Done when:** "Hello Kon Kon" is live.

## Open decisions (✎ — the human's, never the agent's)

From `design.md` §17:
1. Working title: **KON KON** / *Nine Stones* / *The Long Hum* / *Commonweal*
2. Country name sign-off ("the Commonweal") and isles name ("Halcyon")
3. Epilogue trigger formalized: nine tails (all 8 mastered) → Sun Road base scene; Deep Roots lore found en route
4. Pilgrim's eight phase-lines — "the game's best 80 words," to be written as a set

Infrastructure (added 2026-09-03):
5. Deploy target (GitHub Pages / Netlify / Vercel / Cloudflare Pages) — affects the Vite `base` path and CI deploy job

**Resolved 2026-09-03:** ~~#6 — rename `planning/` files to `.md`~~ — moot; the human deleted `planning/` entirely (preserved in git history), leaving the bank's `.md` mirrors as the sole copies.

## Watch items / reminders

- **Git identity is still the placeholder — and it is baked into both commits;** fix and rewrite before any push
- Branch is `master` (git default); rename to `main` optional
- Vite `base` path depends on the deploy choice
- Node non-LTS vs the syllabus's LTS preference
- Design watch items live in the Prototype Watchlist (`design.md` §16) — relevant once battles exist; anything touching the Wane economy is auto-added

## Session protocol

At the end of every session: update this file and `progress.md` (dated, factual). Record rulings in the canon mirrors (`design.md`, `syllabus.md`) only when the human issues them. Full rules: `.clinerules`.
