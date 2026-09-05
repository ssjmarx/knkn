# Progress — tracker & decision log

> What's done, what's pending, what was decided. Update at every session end (see `.clinerules` §5).

## Milestones (the rubric)

| # | Milestone | Semester gate | Done when | Status |
|---|---|---|---|---|
| 1 | **The Walk** | S1 midterm | One map, the follower, day/night tint, one dialogue tree, all three input modes, deployed | 🟨 in progress (U0–U4 done; U5 lab built) |
| 2 | **The boss fight** | S2 final | Scripted boss: base form + two stones, Wane visible on screen, transformation live, win/lose screens | ⬜ not started |
| 3 | **The vertical slice** | S3 | One town, one stone quest, one scaling guardian, phone-perfect, deployed | ⬜ not started |
| 4 | **The demo** | S4 | Next Fest-ready public demo → content grind to v1.0 | ⬜ not started |

## Unit tracker

- **S1 Foundations "The Walk":** U0 — **✅ DONE 2026-09-03** · U1 — **✅ DONE 2026-09-03** (walking fox live) · U2 Tiled tilemaps, collision, camera — **✅ DONE 2026-09-04** (real map live: walls collide, locked camera, canopy layer) · U3 the follower — **✅ DONE 2026-09-04** (cleanups committed in `62a5b51`) · U4 input abstraction — **✅ DONE 2026-09-04** (keyboard + touch + gamepad all confirmed live) · U5 dialogue engine + flag store — **🟨 IN PROGRESS 2026-09-05** (lab code built, uncommitted; lesson/review/challenge + commit & deploy pending)
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
- **2026-09-03** — First code commits pushed to both remotes: `e896e4c` (bank rulings) + `3d36eef` (scaffold); first gated build (`tsc && vite build`) passed
- **2026-09-03** — **UNIT 0 COMPLETE:** `dist/` rsynced to `~/opt/web/knkn` — **"Hello Kon Kon" live at knkn.dunaway.io**, on the human's own infra, first deploy of the course
- **2026-09-03** — Asset licensing convention adopted: `licenses/` folder + source-tagged filenames; first entry Elthen's fox sprite pack (placeholder — bespoke Kon Kon art required)
- **2026-09-03** — Server DNS incident resolved: Pi-hole leftovers (stale `127.0.0.1` + `chattr +i` lock) removed from `/etc/resolv.conf`, repointed to 1.1.1.1/8.8.8.8, re-locked; rsync installed on the server; `~/opt/web/knkn` chowned
- **2026-09-03** — **UNIT 1 COMPLETE:** the fox walks, live at knkn.dunaway.io — scene split (`src/scenes/bootscene.ts` / `gamescene.ts`), Elthen sheet sliced (14×7 grid), walk + idle anims, cursor-velocity movement with world-bounds collision, FIT/autoRound scaling, measured collision body (20×15 at +6,+17), facing-flip challenge done; break-its done; commits `6c58da1` → `d5b190a` → `6477d00`, all pushed
- **2026-09-04** — **UNIT 2 COMPLETE:** Kon Kon walks a real map at knkn.dunaway.io — 30×30 tile world (`test_area.json`, tileset `town` embedded), tile-property collision (57 `collides` props), hard-locked camera (lerp 1 — ruled the accurate GBC feel), canopy overlay (`branches.setDepth(1)`), boot-time tile-size validation via the `Tilemap` object; commits `77a243f` + `2c5e779`, pushed and deployed
- **2026-09-04** — **Three-bug postmortem (Unit 2):** (1) Tiled export carried an external `.tsx` reference — embed tilesets before export; (2) `addTilesetImage` wants the tileset's *name field*, not its filename; (3) Phaser's typed caches: `tilemapTiledJSON` stores `{format, data}` in `cache.tilemap`, not `cache.json` — a lesson-code bug planted by the agent, caught by the human's boot-time validation guard. All three resolved by reading shipped source in `node_modules/phaser/src`, not by guessing. Workflow lesson: debug on `npm run dev`, deploy to verify.
- **2026-09-04** — Aspect ruled **240×240 (1:1)** (supersedes 240×320); camera feel ruled **locked, lerp 1**; Grumpy Function placeholder tilesets (8×8 scaled 2×) licensed in `licenses/` — convention upheld, 2 entries
- **2026-09-04** — **UNIT 3 COMPLETE:** the follower — `src/trail.ts` (pure breadcrumb path: dedup push, `atPathDistance` arc-length interpolation), `src/player.ts` (Player class: `InputSource`-driven movement, 4-direction anims, diagonal normalization via `Math.SQRT1_2`), `src/fox.ts` (Fox class: arcade-physics steering — `chase` P-controller `min(speed, dist·GAIN)`, velocity-based anim state); `makeWalk` closure lesson; Super Retro World character sheet licensed (3rd entry); commits `e8c92e7` → `4b7e58a`, pushed
- **2026-09-04** — **The follower algorithm, as iterated by the human:** frame-delay replay → euclidean gap (warped on path folds) → **arc-length targeting** (measure along the path, interpolate the remainder — the human's design) → **steering follower** (Fox as arcade body chasing the arc-length target — final form, ruled smooth). Meta-lesson: write the screen-position algebra before applying pixel-art folklore (a `Math.round`-anchoring attempt manufactured jitter by breaking the camera's exact player-position cancellation)
- **2026-09-04** — **U4 pre-started by the human:** `src/input.ts` — `InputSource` interface (`x/y` axis readouts) + `KeyboardInput implements InputSource`, consumed polymorphically by `Player.move`
- **2026-09-04** — **UNIT 4 COMPLETE:** one game, three hands — `InputSource` interface (axes + `isDown`/`justPressed`/`endFrame`); `KeyboardInput` (cursors + ENTER/ESC, `JustDown` edges); `TouchInput` (DOM shell buttons, `elementFromPoint` slide-retargeting, `Map<pointerId, button|null>` multi-touch with null-as-dead-zone-state, pressed-class feedback); `GamepadInput` (manual 0.15 deadzone — `setAxisThreshold` is per-pad, not per-plugin; rising-edge `justPressed` via `wasDown`); `CompositeInput` as the scene's composition root; landscape fixed-overlay + `100dvh`. **Done-when confirmed by the human: keyboard, phone (portrait + landscape), and gamepad all walk the fox, live at knkn.dunaway.io.** Commits `62a5b51` → `6030197`, pushed and deployed
- **2026-09-05** — **U5 LAB BUILT (unit still in progress):** dialogue engine + flag store — `src/dialogue.ts` (types + type guards; dialogue text may be a flag-reading function), `src/dialogues.ts` (sample data: choices, flag-conditional text, `onComplete`), `src/dialoguesystem.ts` (`DialogueSystem` parallel scene — prompt text, choice buttons with pointer + keyboard nav, explicit container hit-areas, `onComplete` unified in `advance()`), `src/flags.ts` (pure store), red test trigger + enter-edge detection (`wasInsideTrigger`) in `gamescene.ts`. Uncommitted; not deployed (`dist/` still the 09-04 build). Remaining: lesson formalization, review follow-ups (duplicate `Flags` type; dialogue input not yet on `InputSource`), break-it/challenge, commit & deploy

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
| 2026-09-03 | Asset licensing convention: every third-party asset gets its license copied into `licenses/` and a source-tagged filename (e.g. `_elthens`); placeholder fox = Elthen's pack (32×32, non-GBC, not two-tone-ready — bespoke Kon Kon art required) | user directive |
| 2026-09-03 | Code style: **semicolon-free** (ASI), commas only where required — "treating it like Python" | user ruling |
| 2026-09-03 | File naming: **lowercase for everything** (`bootscene.ts`, `gamescene.ts`) — consistency over convention | user ruling |
| 2026-09-04 | Virtual resolution **240×240 (1:1)**, 15×15 tiles visible — supersedes 240×320 (3:4); portrait room for shell art/buttons, landscape side bars for alternate touch layout | user ruling |
| 2026-09-04 | Camera feel: **hard-locked, lerp 1** — the accurate GBC representation; deadzone/trailing rejected for the overworld (sub-pixel jitter observed at low lerp; real GB hardware scrolled whole pixels only) | user ruling |
| 2026-09-04 | **Follower jitter resolved (Unit 3):** direct trail-point placement jittered during camera movement (rounding-phase mismatch between fox float position and roundPixels camera scroll); rounding the fox target made it worse (confirmed the theory); final design — fox is an Arcade physics sprite (`src/fox.ts`) with proportional steering toward the interpolated trail point, sharing the player's physics step. All agent-review cleanups applied (Point2 import, dead-code trim, named SPRITE_Y_OFFSET) | user design + joint diagnosis |
| 2026-09-04 | **Fox collision removed (Unit 3 ruling, supersedes same-day collider addition):** the follower is a visual echo of the player's legal path — player collision already validates the trail, corner clipping is unnoticeable, and a wall collider made the fox stick on geometry (bug factory). No wall collider, no world-bounds clamp on the fox; body-size fix moot | user ruling |
| 2026-09-04 | Placeholder terrain: Grumpy Function interior + exterior tilesets (8×8 DMG-style, scaled 2× to `TILE_SIZE` 16; "clashy" placeholder look accepted — bespoke art later); license filed in `licenses/` | user action |
| 2026-09-04 | Follower architecture: **Fox as an arcade-physics steering follower** (`chase` P-controller toward the arc-length trail target) — replaces position-replay; collision ruling recorded separately above | user ruling |
| 2026-09-04 | Placeholder character: Super Retro World free characters pack (16×20 frames, 9×4 grid, character 1; whitespace removed from source sheet); license filed — 3rd `licenses/` entry | user action |
| 2026-09-04 | U4 pre-started: `InputSource` interface + `KeyboardInput` built independently by the human; the formal U4 lesson formalizes it (literal unions, narrowing, enums, more sources) | user action |
| 2026-09-05 | U5 status ruled: **in progress** — lab code built, but lesson/review/challenge steps not yet done; nothing committed or deployed | user ruling |
| 2026-09-05 | Dual agent-rules files, deliberate: `.clinerules` (header retitled "instructions") = the Cline plugin's copy; full copy at `memory-bank/instructions.md` = another agent's copy | user ruling |
| 2026-09-05 | `memory-bank/projectMap.md` adopted — repo tree snapshot excluding `.git/`, `node_modules/`, `dist/`; regenerated this date; a script to auto-regenerate it is planned next session | user action |
| 2026-09-05 | **Control map ruled immutable (post-lock, `design.md` §18):** eight inputs only — D-pad, A, B, Start, Select; A = confirm/advance, B = cancel/back; Start/Select reserved for the pause menu. Bindings are placeholders for future rebindable controls (keyboard: arrows, Z/X = A/B, ENTER/ESC = Start/Select; gamepad: buttons 0/1/8/9; HTML Start/Select buttons when relevant). Encoded in the type system immediately: `Action = "a" \| "b" \| "start" \| "select"` | user ruling |

- **2026-09-04** — **Unit 3 cleanups (uncommitted at entry time; since folded into the U4 pre-start):** review cleanups applied (Point2 type-only import, dead-code trim, named `SPRITE_Y_OFFSET`); fox body-size fix ruled moot (no collider); commit & deploy of the trailing changes was the remaining step

## Not started

Everything else: units U6–U23 (U5 in progress), milestones 1–4 (M1 in progress — U5 completion + day/night tint remain), CI.
