# Active Context — where we are right now

> The living file. Future agents: read this after the brief/context files; update it at session end. Date every entry. Facts only.
> **Retention (ruled 2026-09-05, amended 2026-09-10):** the current unit's session updates stay in detail; at each unit boundary the previous unit's updates compress to one-liners here and their verbatim text moves to `archive/activeContext-history.md`. Durable facts live in `progress.md`'s unit tracker and decision log.

## Current state (2026-11-10, evening — UNIT 7 COMPLETE, UNIT 8 BEGINNING

## What's next (the human's solo work)

- **Lab C ship step:** review the diff (large — two new doors, 17 new move rows, the test sync), veto any provisional number (second-original stats, the three provisional weights, ladder timings, "Honeysuckle"), then commit; optional deploy (verify's build already ran — data only, no logic change).
- Rule whether U7's "all 67 moves load and typecheck" closes with the 54 named rows or the 15 templates / 40 semi-originals wait for U18's pipeline; record in the tracker.
- U8 — the initiative queue: discriminated unions (`BattleCommand`), `never` exhaustiveness — the data layer is its first consumer.
- A canon line needed by U13: wild stat derivation — same cap/curve math with per-species curves? Same HP law? (Agent recommendation on record: same HP law for everything.) Currently uncanon'd; blocks real early-game balance audits.
- CI when convenient (Gitea Actions; verify is the spec).
- Parked electives: tint-phase lerp; B-held 3× typing speed. Optional tidy: docker rm pihole.
- Tunable by design, revisit at playtest: FOX_CURVE (0.5, 1) placeholder; envelope bounds (floor 2 / ceiling 14); every Lab C provisional number (the Wall maxim: don't get attached).

## Open decisions (✎ — the human's, never the agent's)

From design.md §17:

- Working title: KON KON / Nine Stones / The Long Hum / Commonweal
- Country name sign-off ("the Commonweal") and isles name ("Halcyon")
- Epilogue trigger formalized: nine tails (all 8 mastered) → Sun Road base scene; Deep Roots lore found en route
- Pilgrim's eight phase-lines — "the game's best 80 words," to be written as a set
- Character customization & renaming — where/when the customization and rename screens live in the game flow (design.md §17–18)

(Infrastructure open decisions #5 and #6 were both resolved 2026-09-03 — see the decision-log archive.)

## Watch items / reminders

- vitest pin audit: confirm package.json reads "vitest": "5.0.0" (no caret) — the discipline is worth the glance.
- Two one-word docstring fixes open from the restructure: `core/input.ts` module line 2 still names KeyboardInput; `keyboardinput.ts` line 4 still says "alongside KeyboardInput" — both publish into the generated map until fixed and `npm run map` re-run.
- The gitea alias on eMachine points at the server's LAN IP — fine at home; off-LAN pushes (Tailscale) need a host block using the Tailscale IP.
- A GitHub PAT sits in plaintext in eMachine's ~/.bash_history (~line 1640) — unused (SSH everywhere); mint-and-scrub if ever needed.
- Global gitconfig still carries squeejee09@gmail.com (repo-local overrides with SSJMarx@dunaway.io).
- Design watch items live in the Prototype Watchlist (design.md §16); anything touching the Wane economy is auto-added.

## Session protocol

At the end of every session: update this file and `progress.md` (dated, factual). Record rulings in the canon mirrors (`design.md`, `syllabus.md`) only when the human issues them. Full rules: `.clinerules`.

## Recent history (compressed 2026-09-10 — verbatim text in `archive/activeContext-history.md`)

- **Phase:** Semester 2, U7 in progress. Lab A: the typechart door (9×9, spirit included). Labs B–C: `src/data/` now holds moves (54 canon-named rows), stones (8), ladders (8 provisional timelines), plus forms/typechart; 95 tests in root /tests; npm run verify (test → tsc → map → build, halt-on-error) green. Nothing imports the data layer yet — U8's battle engine is the first consumer. U7's done-when ("all 67 moves load and typecheck") still has the 15 templates / 40 semi-original instances open — the human's call whether that closes in U7 or waits for U18's pipeline.
- **Git/deploy:** branch master; U7 Labs A–B + the base-kit commit `365f1f2` pushed to origin. This session's Lab C tables + test sync are verified and **uncommitted** — the review + commit ship step is the human's. CI still unbuilt; verify is its local precursor and future spec.
- The human does all implementation themselves; the agent teaches, reviews, and maintains this bank — nothing else.
- **2026-09-05 — U5 complete + two interludes:** dialogue engine + flag store, all three input modes, deployed (M1's dialogue-tree requirement ticked); the Cartographer (docstring convention + `npm run map`); the Restructure (layered `src/{core,input,actors,scenes,ui}`, zero-Phaser grep-enforced core).
- **2026-09-06 — NPC interlude → MILESTONE 1 complete & deployed → U6 complete:** NPCs replaced area triggers as the dialogue entry points; the polish pass (Y-sort, typewriter with B repurposed, day/night tint "the lamp", `halt`, turn-to-face, the `Dialogue.condition` gate verb); the value-import invariant + audit grep joined the ship ritual. U6: the pure core + Vitest — stats/caps/curves, the injected-Die damage roll, the exact stage table, the matchup-envelope sweep (65 tests); `npm run verify` born; the daynight assignability≠exactness catch; the fossil-test and green-then-commit habits.
- **2026-09-09 — interlude:** the 13 `math update plan/` docs consolidated into `CONSOLIDATED.md` (~38KB) under the ruling *later revisions overrule earlier ones*. **Two canon conflicts flagged, unresolved (the human's to rule):** (1) the plan's HP formula `battleHp = hpStat × (L/45 + 1)` (cap 150 per form, BST 900) amends canon §5.1's `HP = 5 + 4L` and the shipped `core/stats.ts`; (2) rev12's Channeler pip accuracy `100/75/66/50/33/0` vs canon §7.4 Wane's `100/75/55/40/30`. The bank is unchanged until ruled.
- **2026-09-10 — U7 Labs B–C (agent-applied under explicit `.clinerules` overrides; plans approved in plan mode first):** moves 24 → 37 (the same-sitting transcription rule learned from the stale-pin failure), then 37 → **54** + `stones.ts` (8 rows; Venus's town provisional "Honeysuckle") + `ladders.ts` (8 provisional timelines); `recoil?: number` joined the Move interface. 95 tests, verify green, map at 27 modules; **tables uncommitted — the human's ship step.** All rulings in the decision log.
- **2026-09-10, late — the bank compression (user ruling, plan approved in plan mode):** `archive/` created; session updates, the pre-09-06 decision-log rows, the U2–U6 engine/test lesson notes, the instructions copy, and the generated project map archived verbatim; the living files compressed; the retention rule amended (`.clinerules` §5); canon (`design.md`, `syllabus.md`) untouched.
