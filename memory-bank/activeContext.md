# Active Context — where we are right now

> The living file. Future agents: read this after the brief/context files; update it at session end. Date every entry. Facts only.
> **Retention (ruled 2026-09-05):** keep detailed history only for the last two units — older unit history compresses to one-liners; the unit tracker and decision log in `progress.md` carry the durable facts; deep history lives in git.

## Current state (2026-09-05, third session — the restructure; Unit 5 complete)

- **Phase: Milestone 1 finish line.** U0–U5 complete. Remaining for M1: the flag→dialogue challenge (folded in from U5) + the day/night tint — then **The Walk ships** (one map, follower, tint, dialogue tree, three input modes, deployed).
- **Git/deploy:** branch `master`, HEAD `9156100`, tree clean, pushed. Latest deploy 2026-09-05 15:24 — the dialogue build; this session changed no shipped behavior, no deploy needed. CI not yet built.
- **Unit one-liners (detail → `progress.md`):** U0 dev env + scaffold (09-03) · U1 walking fox (09-03) · U2 Tiled world + 240×240 ruling (09-04) · U3 the follower (09-04) · U4 three-mode input (09-04) · U5 dialogue engine + flag store + the one-pad input map (09-05).
- The human does **all** implementation themselves; the agent teaches, reviews, and maintains this bank — nothing else.

## What's next (the human's solo work)

1. **M1 finish:** the U5 challenge — a second trigger whose choices set a flag, and the first NPC's text changes because of it (`text: (flags) => …` + `getFlag<T>`); then the day/night tint; then The Walk ships.
2. CI when convenient: typecheck + build + deploy on push (Gitea Actions is the natural candidate).
3. Cosmetic residuals from the U5 review, whenever: touchinput `endFrame` casts `Object.keys(...) as Action[]` (should be `Button[]` — works, but the type lies); unused `Direction` imports in `touchinput.ts` + `gamepadinput.ts`; stray trailing comma in `dialoguesystem.ts`'s dialogue import; `gamepadinput.ts` `endFrame` stray blank line.
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
