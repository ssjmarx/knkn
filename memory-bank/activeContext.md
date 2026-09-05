# Active Context — where we are right now

> The living file. Future agents: read this after the brief/context files; update it at session end. Date every entry. Facts only.
> **Retention (ruled 2026-09-05):** keep detailed history only for the last two units — older unit history compresses to one-liners; the unit tracker and decision log in `progress.md` carry the durable facts; deep history lives in git.

## Current state (2026-09-05, end of session — Unit 5 complete)

- **Phase: Milestone 1 finish line.** U0–U5 complete. Remaining for M1: the flag→dialogue challenge (folded in from U5) + the day/night tint — then **The Walk ships** (one map, follower, tint, dialogue tree, three input modes, deployed).
- **Git/deploy:** branch `master`, HEAD `8835961`, tree clean, in sync with `origin/master` (Gitea primary + GitHub mirror — full topology in `techContext.md`). Latest deploy **2026-09-05 15:24, verified on the server** (`~/opt/web/knkn`) — the dialogue build is live at knkn.dunaway.io. CI not yet built.
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
