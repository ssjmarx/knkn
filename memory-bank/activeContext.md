# Active Context — where we are right now

> The living file. Future agents: read this after the brief/context files; update it at session end. Date every entry. Facts only.
> **Retention (ruled 2026-09-05):** keep detailed history only for the last two units — older unit history compresses to one-liners; the unit tracker and decision log in `progress.md` carry the durable facts; deep history lives in git.

## Current state (2026-09-06, evening — UNIT 6 COMPLETE: the pure core + Vitest)

- **Phase:** Semester 2 is open. U6 done — `src/core/{stats,stages,damage,forms}.ts`: cap-grown stats, the exact ±6 stage table, the damage formula with the ruled 85–100 roll behind an injected Die, and the nine-form sheet; 65 tests in root /tests (one suite per core module); npm run verify (test → tsc → map → build, halt-on-error). Nothing imports the core yet — dist/ is byte-identical; the soul shipped ahead of the body. U8's battle engine is the first consumer.
- **Git/deploy:** branch master; Labs 0–C committed [HASHES]; remaining ship step: the daynight contract fix — verify + commit. Deployed once mid-session (byte-identical build). CI still unbuilt; verify is its local precursor and future spec.
- The human does all implementation themselves; the agent teaches, reviews, and maintains this bank — nothing else.

## What's next (the human's solo work)

- Finish the U6 ship step: npm run verify (expect 7 files / 65 tests; the 1.39 MB chunk warning is Phaser's weight, filed for U21/22) → commit the daynight fix → optional deploy (dist unchanged).
- U7 — the data tables: typechart, moves, stones as JSON + TS validation (Partial, Pick, load-time guards). The pre-L50 power gate lives here — availability, not formula, per ruling.
- A canon line needed by U7/U13: wild stat derivation — same cap/curve math with per-species curves? Same HP law? (Agent recommendation on record: same HP law for everything.) Currently uncanon'd; blocks real early-game balance audits.
- CI when convenient (Gitea Actions; verify is the spec).
- Parked electives: tint-phase lerp; B-held 3× typing speed. Optional tidy: docker rm pihole.
- Tunable by design, revisit at playtest: FOX_CURVE (0.5, 1) placeholder; envelope bounds (floor 2 / ceiling 14).

## Open decisions (✎ — the human's, never the agent's)

From design.md §17:

- Working title: KON KON / Nine Stones / The Long Hum / Commonweal
- Country name sign-off ("the Commonweal") and isles name ("Halcyon")
- Epilogue trigger formalized: nine tails (all 8 mastered) → Sun Road base scene; Deep Roots lore found en route
- Pilgrim's eight phase-lines — "the game's best 80 words," to be written as a set
- Character customization & renaming — where/when the customization and rename screens live in the game flow (design.md §17–18)

(Infrastructure open decisions #5 and #6 were both resolved 2026-09-03 — see the decision log in progress.md.)

## Watch items / reminders

- vitest pin audit: confirm package.json reads "vitest": "5.0.0" (no caret) — the discipline is worth the glance.
- Two one-word docstring fixes open from the restructure: `core/input.ts` module line 2 still names KeyboardInput; `keyboardinput.ts` line 4 still says "alongside KeyboardInput" — both publish into the generated map until fixed and `npm run map` re-run.
- The gitea alias on eMachine points at the server's LAN IP — fine at home; off-LAN pushes (Tailscale) need a host block using the Tailscale IP.
- A GitHub PAT sits in plaintext in eMachine's ~/.bash_history (~line 1640) — unused (SSH everywhere); mint-and-scrub if ever needed.
- Global gitconfig still carries squeejee09@gmail.com (repo-local overrides with SSJMarx@dunaway.io).
- Design watch items live in the Prototype Watchlist (design.md §16); anything touching the Wane economy is auto-added.

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

- **Interlude, not a unit.** The docstring convention (3-line JSDoc module blocks + 1-line one-liners, strict mode) and `scripts/projectmap.ts` (`npm run map` regenerates the GENERATED `projectMap.md`) shipped; commit `501e459`. Durable facts: decision log 2026-09-05. (Detail: git history.)

## Session update (2026-09-05, third — the restructure: layers made physical)

- **Interlude, not a unit.** Layered layout `src/{core,input,actors,scenes,ui}` (zero-Phaser core, grep-enforced), the input contract split into `core/input.ts`, `"noUnusedLocals": true`; commits `d993b42` + `9156100`. Durable facts: decision log 2026-09-05. Residual: two one-word docstring fixes (→ Watch items). (Detail: git history.)
## Session update (2026-09-06 — the NPC interlude → the polish pass → MILESTONE 1)

- **The NPC interlude:** `src/actors/npc.ts` — static stand-frame villagers from the same SRW sheet (character 2 stand column 4, character 3 column 7), immovable bodies mirroring Player's footprint, each carrying its `Dialogue[]`. **The area trigger was retired — NPCs are the dialogue entry points now**; `npc_greeting` deleted. Talk verb: `Player.frontTile()` body-anchored facing-tile probe (PROBE_INSET 2) + fresh A-press in `tryTalk` (NPC first, fox second; no `isShowing` guard — the branch structure is the guard).
- **Two engine lessons, both proven by break-its:** (1) Phaser 4 culled the pass-through setters — `body!.immovable = true` is the P4 form, and it typechecks through the `Body | StaticBody` union because the property exists on both members; (2) `RectangleToRectangle` counts zero-area edge contact as intersection — the perpendicular side-talk bug — replaced by a hand-rolled strict positive-overlap predicate in `Npc.overlaps`.
- **The ambient-namespace bug class:** `keyboardinput.ts` had used `Phaser.` values with no import since U4 — the global type namespace makes that compile silently, and it failed only at runtime in the deployed bundle. Fixed with a value import; **the value-import invariant + audit grep joined the ship ritual** (decision log).
- **The polish pass (all 8 items):** Y-sort (`depth = body.bottom` per frame; canopy re-placed at 1000) · `Player.halt()` + fox-idle during dialogue (both logged walk-while-talking residuals closed) · NPC turn-to-face (`src/actors/pcsheet.ts` single-homes `ROW_INDEX`/`SHEET_COLUMNS`; `OPPOSITE` mirror; `Player.facing` getter with the `_facing` rename) · opaque bottom-anchored textbox (config-derived geometry, 2px stroke; covers the player when talking from below — GB-correct) · typewriter (the scene's own `update(delta)`, 30ms/char, `pendingChoices` held back until typing completes, **B repurposed: skip typing / advance — B-exit deleted**) · day/night tint (`src/core/daynight.ts` — pure hour→tint table, half-open phases; full-screen overlay `setScrollFactor(0)` at depth 2000; wall clock for now, U16 swaps the source; the box stays untinted at night — "the lamp") · the fox is talkable, and became the choices-path test tree (`fox_liked` value-overwrite — repeat-safe by construction).
- **The engine grew one verb:** `condition?: (flags) => boolean` on `Dialogue` + the skip-walk in `showCurrentLine` — **gate** joins read (text functions) and write (choices/`onComplete`). Skipped lines are fully inert; conditions evaluate at arrival time. Idioms established: say-once (condition negates the flag its own `onComplete` sets), counter (`npc{1,2}_visits` + `Math.min` clamp — **the eternal final fact is ruled GBC-accurate**), complementary XOR gates, the adjacency invariant (no line's `onComplete` may write a key a later line's `condition` reads). Everything after the extension was content — zero further system changes.
- **The TS6133 incident:** a placeholder comment in the Lab C diff deleted the choice branch of `handleInput`; the build court caught it as two write-only private fields (a dead store = vanished readers — the symptom of deleted code). Restored verbatim.
- **Content review passed (no bugs):** the villager tables compose say-once + XOR gates + counters correctly; `dialogues.ts` docstring rewritten (three flags stale) and `Flags` moved to `import type`. The fox tree closed the Lab C content gap — the choices path is reachable and playtested.
- **M1 ruled complete by the human:** all break-its and three-mode playtests green; deployed. "One dialogue tree" is satisfied under both readings — player-input branch (the fox) and world-state branch (the villagers).

## Session update (2026-09-06, evening — UNIT 6: the pure core + Vitest)

    Lab 0: Vitest 5.0.0 exact-pinned; tests at root /tests (outside the map parser's jurisdiction by construction); npm test = vitest run; tests joined to the tsconfig include. The two courts: Vitest transforms via esbuild — types stripped, never checked; a type error in a test is invisible to npm test; tsc is the only type court, now covering tests.
    The mid-unit audit → five rulings → stats v2: actual = floor(Cap × growth(L)), clamped 255; growth per spirit type ({start, exponent}); sheet = caps; +5 stat flat deleted; HP law untouched. core/stats.ts (GrowthCurve, FOX_CURVE — placeholder, playtest-discovered), core/stages.ts (the ruled ±6 table, generated + pinned), core/forms.ts (Record<StatKey, number> — Record-as-validation a unit early, for the sweep).
    The damage roll ruling: integer 85–100 × at the final step, Pokémon-copied, for risk-reward. Purity by injection: Die = (min, max) => number as damage's second parameter — the InputSource move applied to randomness; tests aim worst-case questions with maxDie/minDie, and a spy die pins the ruled range as law. Consequence: the minimum hit is ~1 after flooring, not 2.
    Lab C — the envelope: tests/matchups.test.ts sweeps every roster pair × both channels × levels {5…255} × powers {60,100,125}, collect-then-assert (failures enumerate every violation). Bounds ruled: OHKO floor 2 every channel; ceiling 14, best channel, Power ≥ 60 — "fine for now," tunable consts. The classic Rule of 500 survives as an anchor test: base mirror, L50, P100, five hits at both roll extremes.
    The challenge folded into a guided lab (second fold; U5 was first): tests/daynight.test.ts — edge-pair probes, the tiling property, transcribed-not-mirrored expectations.
    The catch of the unit: the daynight suite failed 13/16 on first contact — tintForHour was returning raw Phase rows (4 fields) past its 2-field Tint contract. Assignability ≠ exactness: a wider object passes a narrower annotation silently; exact object shape is expressible only in tests (toEqual), never in types. Fixed by destructuring the contract fields; the shared-row mutation hazard was cured by the same fix; the "table's memory" test became "table's privacy" (.not.toBe). The failure set was the diagnosis: exactly the full-structural assertions failed.
    Two incidents, two habits: the fossil tests (a restore resurrected v1 expectations and silently swept out the stages suite — a green output with a wrong count; the count audit is now the first read of any test output) and green-then-commit (every green run is a checkpoint; git is the undo).
    npm run verify — built by the human unprompted (test && tsc && map && build, halt-on-error): the ship ritual as one command, the future CI spec, deploy deliberately separate. Its maiden voyage caught the daynight bug before commit.
    Final state: 23 modules in the map; the core's dependency graph is born (damage → stages); zero Phaser touched all session. Commits [HASHES]; daynight-fix commit pending the ship step.
- **Bank compression, same evening (retention rule applied):** the two 2026-09-05 interlude session updates (Cartographer, Restructure) compressed to one-liners — durable facts live in the decision log; Watch items deduplicated against What's next and `techContext.md`; the merged decision-log rows in `progress.md` split into proper rows (zero facts changed); canon mirrors and `projectMap.md` untouched.

## Session update (2026-09-09 — the math-update-plan consolidation, interlude)

- **Interlude, not a unit (no code touched).** The 13 planning docs in `math update plan/` (baseline + revisions 1–12, ~290KB) were consolidated into a single **`math update plan/CONSOLIDATED.md`** (~38KB, 749 lines) under the human's ruling **later revisions overrule earlier ones**. Structure: superseded-docs ledger (§0) → core stats + the rev9 HP formula `battleHp = hpStat × (L/45 + 1)` with HP cap 150 per form / BST 900 (§2) → damage math (§3) → final type chart = rev10's table, the last full pass (§4) → rev12 battle engine: simultaneous Channeler+Spirit turn resolution, transformation cancels the same-side Spirit's action, Bound blocks transform, stages persist / volatiles clear, pip accuracy decay, curses, weather transitions (§5) → items (§6) → rev10 audit suite (§7) → open-items ledger (§8) → codebase impact (§9) → phased implementation order (§10). Originals left in place for git history.
- **Two canon conflicts flagged, neither resolved (the human's to rule):** (1) the plan's HP formula amends canon §5.1's `HP = 5 + 4L` and the shipped `core/stats.ts`; (2) rev12's Channeler pip accuracy values `100/75/66/50/33/0` vs canon §7.4 Wane's `100/75/55/40/30`. CONSOLIDATED.md records both as proposals pending ruling; the bank is unchanged until then.
