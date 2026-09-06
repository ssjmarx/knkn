# Progress — tracker & decision log

> What's done, what's pending, what was decided. Update at every session end (see `.clinerules` §5).
> **Retention (ruled 2026-09-05):** detailed Done entries are kept for the last two units only; older history is compressed to one-liners below; the decision log is permanent and is never compressed.

## Milestones (the rubric)

| # | Milestone | Semester gate | Done when | Status |
|---|---|---|---|---|
| 1 | **The Walk** | S1 midterm | One map, the follower, day/night tint, one dialogue tree, all three input modes, deployed | 🟨 in progress (U0–U5 done; challenge + tint remain) |
| 2 | **The boss fight** | S2 final | Scripted boss: base form + two stones, Wane visible on screen, transformation live, win/lose screens | ⬜ not started |
| 3 | **The vertical slice** | S3 | One town, one stone quest, one scaling guardian, phone-perfect, deployed | ⬜ not started |
| 4 | **The demo** | S4 | Next Fest-ready public demo → content grind to v1.0 | ⬜ not started |

## Unit tracker

- **S1 Foundations "The Walk":** U0 — **✅ 2026-09-03** · U1 — **✅ 2026-09-03** (walking fox live) · U2 Tiled tilemaps, collision, camera — **✅ 2026-09-04** (real map live; 240×240 + lerp-1 rulings) · U3 the follower — **✅ 2026-09-04** (cleanups committed in `62a5b51`) · U4 input abstraction — **✅ 2026-09-04** (keyboard + touch + gamepad all confirmed live) · U5 dialogue engine + flag store — **✅ 2026-09-05** (labs + break-its + commit & deploy; challenge folded into M1 by user ruling)
- **S2 The Battle Machine:** U6 pure core + Vitest (Rule of 500) · U7 data tables · U8 the initiative queue (discriminated unions, `never`) · U9 Channeler rites & Wane · U10 transformation & the Band · U11 statuses/stages/Dwindle/Doom — *all not started*
- **S3 The Living World:** U12 battle↔overworld integration · U13 packs · U14 Foxfire Split · U15 save/load & versioning · U16 the clock & schedules · U17 stone quests (8 verbs) — *all not started*
- **S4 Production & Ship:** U18 content pipeline · U19 audio · U20 UX/menus/Codex/shell · U21 mobile QA · U22 distribution · U23 public demo & playtest — *all not started*

## Done (detailed — last two units only: U4, U5)

- **2026-09-04** — **UNIT 4 COMPLETE:** one game, three hands — `InputSource` interface (axes + `isDown`/`justPressed`/`endFrame`); `KeyboardInput` (cursors + ENTER/ESC, `JustDown` edges); `TouchInput` (DOM shell buttons, `elementFromPoint` slide-retargeting, `Map<pointerId, button|null>` multi-touch with null-as-dead-zone-state, pressed-class feedback); `GamepadInput` (manual 0.15 deadzone — `setAxisThreshold` is per-pad, not per-plugin; rising-edge `justPressed` via `wasDown`); `CompositeInput` as the scene's composition root; landscape fixed-overlay + `100dvh`. **Done-when confirmed by the human: keyboard, phone (portrait + landscape), and gamepad all walk the fox, live at knkn.dunaway.io.** Commits `62a5b51` → `6030197`, pushed and deployed
- **2026-09-05** — **UNIT 5 COMPLETE:** the dialogue engine + flag store, and the one-pad input map — `src/dialogue.ts` (types; text may be a flag-reading function), `src/dialogues.ts` (sample data), `src/dialoguesystem.ts` (parallel scene; input-agnostic `handleInput`; pointer + keyboard choice nav; explicit container hit-areas; `onComplete` unified in `advance()`), `src/flags.ts` (pure store). Input: `Action = "a" | "b" | "start" | "select"` + `Button = Action | Direction`; `KeyboardInput` as one `Record<Button, Key>` table (Z/X/ENTER/ESC placeholder bindings); TouchInput unified `buttons`/`just` records over `Button`; GamepadInput d-pad fixed (stick-past-deadzone-else-dpad — the d-pad previously did nothing) + `buttonIndex` 0/1/8/9; `axis()` + `isAction`/`isDirection` single-homed in `input.ts`; GameScene = the single input owner (`isShowing` → `handleInput`, else movement; one `endFrame()`; walk-while-talking fixed). **Done-when met: dialogue drivable by keyboard, phone, and gamepad — live at knkn.dunaway.io.** Commits `7ddab37` + `8835961`, pushed and deployed (server-verified 15:24). The flag→dialogue challenge folded into M1 by user ruling; cosmetic residuals logged in `activeContext.md`
- **2026-09-05 (second session)** — **THE CARTOGRAPHER (dev-tools interlude):** the docstring convention ruled + typed across all 15 modules (3-line module blocks; 1-line one-liners above every function/method/getter; constructors, fields, types/interfaces, data consts, and nested locals exempt); `scripts/projectmap.ts` built — a line-scanning parser (anchored heads, `CONTROL` blacklist, `inTypeBody` state machine) with strict enforcement (exit 1 with coordinates; the map refuses to write) that regenerates `memory-bank/projectMap.md` via `npm run map` (Node type stripping; `@types/node` devDep; `scripts` inside the tsc gate). Debugging arc: `noUncheckedIndexedAccess` × arrays/regex-captures (six proof-backed `!`s), the `*/`-inside-a-comment lesson, IDE panel vs the CLI court. Not a syllabus unit — the unit tracker is unchanged; the M1 finish line is unchanged

## History (compressed 2026-09-05 — pre-U4; full detail lives in git history and `techContext.md` engine notes)

- **2026-09-03** — Design locked **v1.0** + syllabus v1 + guardrails/memory bank seeded; `planning/` retired into git history (bank mirrors = sole canon); git identity fixed (history rewritten); remotes wired (Gitea primary + GitHub mirror, SSH); Node → **v24.20.0 LTS**
- **2026-09-03** — **U0 COMPLETE:** hand scaffold (Vite + Phaser 4.2.1 + strict TS, exact pins), first gated build, first deploy — "Hello Kon Kon" live on the human's own infra (`knkn-web` nginx container + Cloudflare route); Elthen fox licensed — the `licenses/` convention is born; server DNS incident resolved
- **2026-09-03** — **U1 COMPLETE:** the fox walks — scene split, Elthen sheet slicing, walk/idle anims, cursor-velocity movement, world-bounds collision, FIT scaling, facing-flip challenge; commits `6c58da1` → `d5b190a` → `6477d00`
- **2026-09-04** — **U2 COMPLETE:** a real 30×30 Tiled map — embedded-tileset export, tile-property collision, hard-locked camera (lerp 1 ruling), canopy layer, boot-time tile-size validation; **240×240 (1:1) ruling**; three-bug postmortem (external `.tsx`, tileset name field, typed cache `{format, data}`); Grumpy Function tilesets licensed
- **2026-09-04** — **U3 COMPLETE:** the follower — pure `Trail` (arc-length), `Player`, `Fox` steering; follower-jitter postmortem (rounding-phase mismatch → the fox became an Arcade body on the player's physics step); **fox-collision-removed ruling**; Super Retro World PC licensed; U4 pre-start (`InputSource` + `KeyboardInput` built solo)

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
| 2026-09-05 | U5 ruled **complete** — labs, break-its, commit & deploy landed; the flag→dialogue challenge folds into Milestone 1's remaining work | user ruling |
| 2026-09-05 | **Bank retention rule:** growing history (activeContext session updates, progress Done entries) keeps detail for the last two units only; older history compresses to one-liners; the decision log is permanent and never compressed; context/canon files stay clean reference — canon mirrors (`design.md`, `syllabus.md`) left verbatim | user ruling |
| 2026-09-05 | **Docstring convention:** 3-line JSDoc module blocks (what it is / what it does / where it fits) + 1-line one-liners above every function/method/getter; constructors, fields, types/interfaces, data consts, and nested/local functions exempt. Enforced strictly by `scripts/projectmap.ts` (exit 1; the map refuses to write) | user ruling |
| 2026-09-05 | `memory-bank/projectMap.md` is now **generated** (`npm run map`) — hand-editing retired; the 2026-09-05 auto-regen plan fulfilled; strict enforcement mode chosen (convention-as-compiler) | user ruling |

## Not started

Units U6–U23 (U6 next: the pure core + Vitest — the Rule of 500 is the first test), milestones 2–4, CI. M1 remaining: the folded U5 flag→dialogue challenge + the day/night tint.
