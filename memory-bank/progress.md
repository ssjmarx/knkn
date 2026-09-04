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

- **S1 Foundations "The Walk":** U0 dev env & first deploy — *in progress (repo, identity fix, dual-push remotes, first push, Node 24.20.0 LTS switch, hand scaffold — ALL DONE; Hello Kon Kon sprite, first code commit, first deploy pending)* · U1 scene/sprite/game loop/movement · U2 Tiled tilemaps, collision, camera · U3 the follower · U4 input abstraction (keyboard/touch/gamepad) · U5 dialogue engine + flag store — *not started*
- **S2 The Battle Machine:** U6 pure core + Vitest (Rule of 500) · U7 data tables · U8 the initiative queue (discriminated unions, `never`) · U9 Channeler rites & Wane · U10 transformation & the Band · U11 statuses/stages/Dwindle/Doom — *all not started*
- **S3 The Living World:** U12 battle↔overworld integration · U13 packs · U14 Foxfire Split · U15 save/load & versioning · U16 the clock & schedules · U17 stone quests (8 verbs) — *all not started*
- **S4 Production & Ship:** U18 content pipeline · U19 audio · U20 UX/menus/Codex/shell · U21 mobile QA · U22 distribution · U23 public demo & playtest — *all not started*

## Done

- **2026-09-03** — Game design locked at **v1.0** (`planning/outline`): vision & pillars, setting canon, geography, clock/calendar, the fox (stats, nine forms, tails, mastery), 67 moves & 92 instances, battle system (two-actor queue, damage formula, statuses, Wane, 29 rites, Foxfire Split, packs, scaling), Powers, 8×8 type chart, reputation tiers, overworld verbs, story spine, cast & organizations, Scope Ledger, Watchlist, open decisions
- **2026-09-03** — Course syllabus v1 (`planning/syllabus`): Phaser/TypeScript track, 4 semesters / 24 units / 4 milestones, 6 locked architecture decisions, TS progression map, lesson format
- **2026-09-03** — AI guardrails seeded: `.clinerules` (learning-project rules, memory-bank-only writes, read-the-bank-first) + this memory bank, with verbatim canon mirrors `design.md` and `syllabus.md`
- **2026-09-03** — Repo initialized as a git repository (branch `master`, no remote): initial commit `61285c6` (`.clinerules` + memory bank + the original planning docs), then `c84cc39` retiring `planning/` — **the memory bank is now the sole source of truth**; the original docs live only in git history
- **2026-09-03** — Git identity fixed: real identity `SSJMarx <SSJMarx@dunaway.io>` set repo-locally; all history rewritten via `rebase --root --reset-author` (commits now `a6a4773`/`d3ab399`/`ddfc91f`)
- **2026-09-03** — Remotes wired and **first push landed**: `origin` fetches Gitea over SSH (alias `gitea:`) with two push URLs (Gitea + GitHub mirror, both SSH via `id_ed25519`); `master` is live on both repos
- **2026-09-03** — Node switched v25.5.0 (non-LTS) → **v24.20.0 LTS** (NodeSource repo repaired `node_22.x`→`node_24.x`, apt downgrade); npm 11.19.0
- **2026-09-03** — Hand scaffold built & agent-reviewed: `.gitignore`, `package.json` (exact pins phaser 4.2.1 / typescript 7.0.2 / vite 8.2.2), strict `tsconfig.json`, `vite.config.ts`, `index.html`, `src/config.ts`, `src/main.ts`; `npm install` clean; typecheck green (not yet committed)
- **2026-09-03** — Deploy leg provisioned by the human: Portainer container **`knkn-web`** (nginx:alpine, volume `~/opt/web/knkn` → web root, `web` network, duplicated from the phix container) + Cloudflare published-app route for `knkn.dunaway.io` registered

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
| 2026-09-03 | `planning/` retired — deleted after preservation in git history; the bank's canon mirrors are the sole authoritative copies | user action |
| 2026-09-03 | Open decision #6 (rename planning files to `.md`) — moot, resolved by deletion | follows from the above |
| 2026-09-03 | Deploy target (open #5 resolved): Cloudflare published app `knkn.dunaway.io`; static hosting via nginx/Portainer on the personal server; Vite `base: '/'` | user directive |
| 2026-09-03 | Repo topology: Gitea (`git.dunaway.io`) primary + GitHub (`ssjmarx/knkn`) mirror via dual push URLs on `origin`; fetches from Gitea only | user directive |
| 2026-09-03 | Git transport: **SSH with the existing `id_ed25519` key everywhere** (per-machine `gitea` alias; `git@github.com` for the mirror) — supersedes the same-day HTTPS-via-Tailscale choice after credential friction; no tokens or credential helpers in use | user action + diagnosis session |
| 2026-09-03 | Engine version: **Phaser 4.2.1** supersedes the syllabus's Phaser 3 line — stable release, human's prior Phaser 4 experience (pointdefense, phix), TS-native types; standing rule: suspect the version first when Phaser 3-era examples misbehave | user ruling |
| 2026-09-03 | Node v25.5.0 → **v24.20.0 LTS** via NodeSource node_24.x (repo file had drifted to node_22.x while 25.5.0 was installed "locally"); npm 11.19.0 | user action |
| 2026-09-03 | Deploy topology confirmed: each game = own Portainer nginx:alpine container volume-mounted from `~/opt/web/<game>` (pointdefense, phix — plain JS); `knkn-web` provisioned + Cloudflare route registered; deploy = build + copy `dist/` to `~/opt/web/knkn/` | user directive |
| 2026-09-03 | **Character customization added to canon (post-lock ruling, `design.md` §18):** player 2–6 sprite variants with GBC-limited palette variations; Kon Kon one sprite set, two color variations (fur + tail tips/underbelly) slightly *breaking* GBC limits as a diegetic hint of otherworldliness; both renamable (classic rename screen) | user ruling |
| 2026-09-03 | GBC shell aesthetic (Unit 20): purple shell with visible-circuitry vibe, nothing legally identifying; multiple options, default TBD | user ruling |

## Not started

Everything else: units U1–U23 (U0 in progress — Hello Kon Kon, first code commit, first deploy, CI pending), all milestones.
