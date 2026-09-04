# Progress — tracker & decision log

> What's done, what's pending, what was decided. Update at every session end (see `.clinerules` §5).

## Milestones (the rubric)

| # | Milestone | Semester gate | Done when | Status |
|---|---|---|---|---|
| 1 | **The Walk** | S1 midterm | One map, the follower, day/night tint, one dialogue tree, all three input modes, deployed | ⬜ not started |
| 2 | **The boss fight** | S2 final | Scripted boss: base form + two stones, Wane visible on screen, transformation live, win/lose screens | ⬜ not started |
| 3 | **The vertical slice** | S3 | One town, one stone quest, one scaling guardian, phone-perfect, deployed | ⬜ not started |
| 4 | **The demo** | S4 | Next Fest-ready public demo → content grind to v1.0 | ⬜ not started |

## Unit tracker

- **S1 Foundations "The Walk":** U0 dev env & first deploy · U1 scene/sprite/game loop/movement · U2 Tiled tilemaps, collision, camera · U3 the follower · U4 input abstraction (keyboard/touch/gamepad) · U5 dialogue engine + flag store — *all not started*
- **S2 The Battle Machine:** U6 pure core + Vitest (Rule of 500) · U7 data tables · U8 the initiative queue (discriminated unions, `never`) · U9 Channeler rites & Wane · U10 transformation & the Band · U11 statuses/stages/Dwindle/Doom — *all not started*
- **S3 The Living World:** U12 battle↔overworld integration · U13 packs · U14 Foxfire Split · U15 save/load & versioning · U16 the clock & schedules · U17 stone quests (8 verbs) — *all not started*
- **S4 Production & Ship:** U18 content pipeline · U19 audio · U20 UX/menus/Codex/shell · U21 mobile QA · U22 distribution · U23 public demo & playtest — *all not started*

## Done

- **2026-09-03** — Game design locked at **v1.0** (`planning/outline`): vision & pillars, setting canon, geography, clock/calendar, the fox (stats, nine forms, tails, mastery), 67 moves & 92 instances, battle system (two-actor queue, damage formula, statuses, Wane, 29 rites, Foxfire Split, packs, scaling), Powers, 8×8 type chart, reputation tiers, overworld verbs, story spine, cast & organizations, Scope Ledger, Watchlist, open decisions
- **2026-09-03** — Course syllabus v1 (`planning/syllabus`): Phaser/TypeScript track, 4 semesters / 24 units / 4 milestones, 6 locked architecture decisions, TS progression map, lesson format
- **2026-09-03** — AI guardrails seeded: `.clinerules` (learning-project rules, memory-bank-only writes, read-the-bank-first) + this memory bank, with verbatim canon mirrors `design.md` and `syllabus.md`

## Decision log

| Date | Decision | Source |
|---|---|---|
| 2026-09-03 | Engine: **Phaser 3 + TypeScript + Vite** (the syllabus's Phaser/TS track supersedes the design doc's closing Godot consideration) | syllabus §I |
| 2026-09-03 | Virtual resolution 240×320 (3:4), 16px tiles, one config constant | syllabus §I.1 |
| 2026-09-03 | Pure logic core — zero Phaser imports, Vitest-tested | syllabus §I.3 |
| 2026-09-03 | Data-driven: all game content as JSON tables validated by TS interfaces | syllabus §I.4 |
| 2026-09-03 | Deploy in week one, CI from the start; web-first, packaging deferred to S4 | syllabus §I.5–6 |
| 2026-09-03 | Tails = mastered stones (not stones carried); the ascent is sequel-only | design lock v1.0 header rulings |
| 2026-09-03 | AI scope: learning project — the agent writes only memory-bank files; the human authors everything else | user directive, guardrail seeding session |

## Not started

Everything else: all units U0–U23, all milestones, repo initialization, first deploy.
