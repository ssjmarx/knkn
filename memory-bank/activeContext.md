# Active Context — where we are right now

> The living file. Future agents: read this after the brief/context files; update it at session end. Date every entry. Facts only.
> **Retention (ruled 2026-09-05):** keep detailed history only for the last two units — older unit history compresses to one-liners; the unit tracker and decision log in `progress.md` carry the durable facts; deep history lives in git.

## Current state (2026-09-06 — MILESTONE 1 COMPLETE: "The Walk")

- **Phase: the S1 midterm gate is closed.** One map, the follower, day/night tint, dialogue trees with bodies (two gossiping villagers + a choices-tree fox), the typewriter textbox, all three input modes — deployed at knkn.dunaway.io. Next: **U6 — the pure core + Vitest** (the Rule of 500 is the first test; `tintForHour` is the queued second).
- **Git/deploy:** branch `master`, HEAD [HASH], tree clean, pushed; deployed and server-verified [TIME]. CI still not built.
- The human does **all** implementation themselves; the agent teaches, reviews, and maintains this bank — nothing else.

## What's next (the human's solo work)

1. **U6 — the pure core + Vitest:** stats, HP, the damage formula, Rule-of-500 tests; `core/daynight.ts`'s `tintForHour` is the natural second target (pure, argument-injected).
2. CI when convenient: typecheck + tests + build + deploy on push (Gitea Actions is the natural candidate).
3. Parked electives from the M1 arc, whenever: the tint-phase lerp challenge; B-held 3× typing speed.
4. Optional tidy: `docker rm pihole` (the dead container).

## Open decisions (✎ — the human's, never the agent's)

From `design.md` §17:
1. Working title: **KON KON** / *Nine Stones* / *The Long Hum* / *Commonweal*
2. Country name sign-off ("the Commonweal") and isles name ("Halcyon")
3. Epilogue trigger formalized: nine tails (all 8 mastered) → Sun Road base scene; Deep Roots lore found en route
4. Pilgrim's eight phase-lines — "the game's best 80 words," to be written as a set
5. Character customization & renaming — where/when the customization and rename screens live in the game flow (start of game vs. diegetic location) — added with the 2026-09-03 customization ruling (`design.md` §17–18)

(Infrastructure open decisions #5 and #6 were both resolved 2026-09-03 — see the decision log in `progress.md`.)

## Watch items / reminders

- The **laptop (second dev machine) has its own, differently-named `gitea` SSH alias** in its `~/.ssh/config`; both machines pushed to Gitea historically. Pushing knkn from the laptop should work via that machine's alias — untested for this repo.
- The `gitea` alias on eMachine points at the server's **LAN IP** — fine at home; pushes from off-LAN (over Tailscale) would need a host block using the Tailscale IP.
- A GitHub PAT sits in **plaintext in eMachine's `~/.bash_history` (~line 1640)** — unused now that everything is SSH; mint-and-scrub if ever needed.
- Global gitconfig still carries `squeejee09@gmail.com` (repo-local config overrides it with `SSJMarx@dunaway.io`); other new repos will default to the Gmail identity unless the human changes the global.
- ~~`~/opt/web/knkn` root-owned~~ — chowned 2026-09-03. The dead `pihole` container still sits on the server (Exited) — optional `docker rm` tidy.
- Design watch items live in the Prototype Watchlist (`design.md` §16) — relevant once battles exist; anything touching the Wane economy is auto-added.

## Session protocol

At the end of every session: update this file and `progress.md` (dated, factual). Record rulings in the canon mirrors (`design.md`, `syllabus.md`) only when the human issues them. Full rules: `.clinerules`.

## Session update (2026-09-05 — Unit 5 COMPLETE: one pad, one pipeline, dialogue live)

- **U5 ruled complete by the human** (labs, break-its, commit & deploy all landed; the flag→dialogue challenge folds into M1's remaining work). Commits `7ddab37` + `8835961`, pushed; build green; deployed and **server-verified 15:24**.
- **Lab A — one home for `Flags`:** the type deduped into `flags.ts`; `import type` everywhere; dead type guards trimmed. An earlier unrecorded review session's #4–#8 fixes (prompt visible on choice pages, explicit container hit-areas, `onComplete` unified into `advance()`, no stacking choice pages) are part of the shipped code.
- **Lab B — the map in the type system:** `Action = "a" | "b" | "start" | "select"`; keyboard placeholder bindings Z/X/ENTER/ESC (rebindable controls assumed future); HTML `data-action="a"/"b"`; gamepad `buttonIndex` 0/1/8/9; `Record` exhaustiveness proven via break-its (missing row = compiler error; HTML typos = silence — hence runtime guards at the DOM boundary).
- **Lab C — `Button` widening + one pipeline:** `Button = Action | Direction` (direction edges first-class); `KeyboardInput` = one `Record<Button, Key>` table (`createCursorKeys` retired); TouchInput unified to `buttons`/`just` records over `Button`; GamepadInput d-pad fixed (stick past deadzone wins, else d-pad — the d-pad previously did nothing); `axis()` + guards `isAction`/`isDirection` single-homed in `input.ts` (human's ruling); `DialogueSystem` lost all raw keys and gained input-agnostic `handleInput(input)`; `GameScene.update()` is the single input owner (dialogue showing → `handleInput`, else movement/trail/fox; one `endFrame()`; walk-while-talking fixed; duplicate `dialogueSystem` assignment deleted). Known cosmetic: the fox freezes mid-frame during dialogue (the anim gate lives in the else branch).
- **Done-when met:** dialogue drivable by keyboard, phone, and gamepad — live at knkn.dunaway.io. M1's "one dialogue tree, all three input modes" requirement ticked.
- **Bank compressed this session (retention rule applied):** pre-U4 history → one-liners in `progress.md`; `techContext.md` environment snapshot tightened to facts; canon mirrors (`design.md`, `syllabus.md`) untouched; decision log permanent.

## Session update (2026-09-05, later — The Cartographer: docstring convention + auto project map)

- **Interlude, not a unit** — the M1 finish line is unchanged (flag→dialogue challenge + day/night tint). The 2026-09-05 "script planned next session" promise is **fulfilled**.
- **Ruling — the docstring convention:** every module opens with a 3-line JSDoc block (what it is / what it does / where it fits), replacing the old `// src/…` first-line comments; every function, method, and getter gets a 1-line one-liner directly above. **Exempt:** constructors, fields, `export type`/`interface`, data consts, and nested/local functions (the last encoded by the parser's 2-space indent anchor). The human typed all 15 modules; agent review verified 15/15 contract-clean (the one violation found was a false positive in the *review tooling*, not the code).
- **The tool — `scripts/projectmap.ts`:** parses src/ and regenerates `memory-bank/projectMap.md` (now carrying a GENERATED/do-not-hand-edit header). Runs on Node 24 **type stripping** (`node scripts/projectmap.ts` — erasable-only TS, zero new runtime deps); `npm run map` alias; `@types/node ^26.4.1` devDep (first caret pin — a noted, accepted deviation from the exact-pins discipline); `scripts` added to `tsconfig.json` include, so the tool lives inside the `tsc` gate.
- **Strict mode (user ruling):** a missing or malformed docstring → exit 1, a violation list with `path:line` coordinates, and the map refuses to write. Convention-as-compiler — the same philosophy as `Record` exhaustiveness.
- **Parser lessons (the debugging arc):** anchored head-matching kills false positives (`if (…)` and `.forEach((key) =>` can never match "name immediately followed by `(`"); the `CONTROL` keyword blacklist is belt-and-suspenders; the `inTypeBody` state machine — interface members are *syntactically identical* to class methods, so context must be carried as state (the fourth state machine this month); the self-destructing comment (a `*/` inside a comment ends it — the convention cannot quote its own delimiter); `noUncheckedIndexedAccess` bites array indexing AND regex captures (`match[1]` is `string | undefined`) — six `!`s, each with a written proof; and the IDE panel under-reports — `./node_modules/.bin/tsc --noEmit` is the court.
- **Map generated clean: 15 modules.** Side effect worth savoring: the map now *displays* parked residuals (e.g. `isDown(action: Button)` in compositeinput — the old param name, visible in the docs until cleaned).
- Committed as `501e459` ("made some tooling hooray") and pushed.

## Session update (2026-09-05, third — the restructure: layers made physical)

- **Interlude, not a unit.** The M1 finish line is unchanged (flag→dialogue challenge + day/night tint).
- **Ruling — layered source layout:** `src/core/` (pure logic: input contract, flags, dialogue types+data, trail — **zero Phaser imports, enforced by `grep -rni phaser src/core/` returning silence**), `src/input/` (keyboard, touch, gamepad, composite sources), `src/actors/` (player, fox), `src/scenes/` (boot, game), `src/ui/` (dialoguesystem — future menus/Codex), `main.ts` + `config.ts` at root. Locked decision #3 is now a filesystem fact, not just a doc bullet.
- **Ruling — input contract split:** `core/input.ts` holds Direction/Action/Button, `InputSource`, `axis`, and the guards; `input/keyboardinput.ts` holds KeyboardInput (the only Phaser-bound half). The map grew to 16 modules.
- **Ruling — `"noUnusedLocals": true`:** the compiler now catches dead imports, which the review had found the tooling never flagged.
- **How it went:** VS Code's update-imports-on-move did the mechanical work (drag files between folders, imports rewritten) — the human's first taste of tooling doing refactor chores; the module-resolution break-it got skipped, deferred to a 60-second manual exercise. Review catches: the dialoguesystem module docstring had been mangled mid-word by the move ("…content and a ␣␣␣ nd polls…" — strict mode would have refused to write the map; repaired before running), a false docstring in keyboardinput ("alongside KeyboardInput" — it IS KeyboardInput), and the dead imports above. All riders landed: trailing comma gone, `as Button[]` cast fixed.
- **Verified:** `tsc` clean via the CLI court; `grep -rni phaser src/core/` silent; map regenerated under the new tree (16 modules, grouped by layer); playtest on the dev server.
- **Residual (third flag, still open):** two one-word docstring fixes — `core/input.ts` module line 2 still names KeyboardInput, and `keyboardinput.ts` line 4 still says "alongside KeyboardInput"; both publish into the generated map until fixed and `npm run map` is re-run. Commits: `d993b42` (restructure) + `9156100` (review fixes), pushed.
## Session update (2026-09-06 — the NPC interlude → the polish pass → MILESTONE 1)

- **The NPC interlude:** `src/actors/npc.ts` — static stand-frame villagers from the same SRW sheet (character 2 stand column 4, character 3 column 7), immovable bodies mirroring Player's footprint, each carrying its `Dialogue[]`. **The area trigger was retired — NPCs are the dialogue entry points now**; `npc_greeting` deleted. Talk verb: `Player.frontTile()` body-anchored facing-tile probe (PROBE_INSET 2) + fresh A-press in `tryTalk` (NPC first, fox second; no `isShowing` guard — the branch structure is the guard).
- **Two engine lessons, both proven by break-its:** (1) Phaser 4 culled the pass-through setters — `body!.immovable = true` is the P4 form, and it typechecks through the `Body | StaticBody` union because the property exists on both members; (2) `RectangleToRectangle` counts zero-area edge contact as intersection — the perpendicular side-talk bug — replaced by a hand-rolled strict positive-overlap predicate in `Npc.overlaps`.
- **The ambient-namespace bug class:** `keyboardinput.ts` had used `Phaser.` values with no import since U4 — the global type namespace makes that compile silently, and it failed only at runtime in the deployed bundle. Fixed with a value import; **the value-import invariant + audit grep joined the ship ritual** (decision log).
- **The polish pass (all 8 items):** Y-sort (`depth = body.bottom` per frame; canopy re-placed at 1000) · `Player.halt()` + fox-idle during dialogue (both logged walk-while-talking residuals closed) · NPC turn-to-face (`src/actors/pcsheet.ts` single-homes `ROW_INDEX`/`SHEET_COLUMNS`; `OPPOSITE` mirror; `Player.facing` getter with the `_facing` rename) · opaque bottom-anchored textbox (config-derived geometry, 2px stroke; covers the player when talking from below — GB-correct) · typewriter (the scene's own `update(delta)`, 30ms/char, `pendingChoices` held back until typing completes, **B repurposed: skip typing / advance — B-exit deleted**) · day/night tint (`src/core/daynight.ts` — pure hour→tint table, half-open phases; full-screen overlay `setScrollFactor(0)` at depth 2000; wall clock for now, U16 swaps the source; the box stays untinted at night — "the lamp") · the fox is talkable, and became the choices-path test tree (`fox_liked` value-overwrite — repeat-safe by construction).
- **The engine grew one verb:** `condition?: (flags) => boolean` on `Dialogue` + the skip-walk in `showCurrentLine` — **gate** joins read (text functions) and write (choices/`onComplete`). Skipped lines are fully inert; conditions evaluate at arrival time. Idioms established: say-once (condition negates the flag its own `onComplete` sets), counter (`npc{1,2}_visits` + `Math.min` clamp — **the eternal final fact is ruled GBC-accurate**), complementary XOR gates, the adjacency invariant (no line's `onComplete` may write a key a later line's `condition` reads). Everything after the extension was content — zero further system changes.
- **The TS6133 incident:** a placeholder comment in the Lab C diff deleted the choice branch of `handleInput`; the build court caught it as two write-only private fields (a dead store = vanished readers — the symptom of deleted code). Restored verbatim.
- **Content review passed (no bugs):** the villager tables compose say-once + XOR gates + counters correctly; `dialogues.ts` docstring rewritten (three flags stale) and `Flags` moved to `import type`. The fox tree closed the Lab C content gap — the choices path is reachable and playtested.
- **M1 ruled complete by the human:** all break-its and three-mode playtests green; deployed. "One dialogue tree" is satisfied under both readings — player-input branch (the fox) and world-state branch (the villagers).