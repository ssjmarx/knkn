> **CANON MIRROR — the authoritative copy.** This file carries the KON KON 101 course syllabus & dev roadmap (Phaser/TypeScript track) inside the memory bank, seeded verbatim from `planning/syllabus` on 2026-09-03. Per `.clinerules`, the memory bank is the AI's source of truth; `planning/` is the historical source of record. Update this file only to record human-issued course changes and rulings, faithfully. If this file and `planning/syllabus` diverge, ask the human which is current before syncing.

# KON KON 101 — Course Syllabus & Dev Roadmap

**Department:** Solo Game Development, Phaser/TypeScript track
**Instructor structure:** I lecture, you build. Every new file gets a full walkthrough — what each line does, why it's written that way, and which TypeScript concept it's exercising. Nothing appears in your codebase that we haven't studied first.
**Final project:** the game. Grading rubric: the Scope Ledger from the design doc.
**Honesty clause:** this is a 2–3 year course at solo-dev pace. The roadmap is built so every semester ends with something *deployed and fun* — solo devs don't die from hard work, they die from working six months without anything to show. We will never do that.

---

## I. Architecture Decisions Locked Before Day One

These shape every lesson, so we settle them now:

1. **Virtual resolution: 240×320 (3:4), 16px tiles.** That's 15×20 tiles visible — more vertical world than a real GBC ever showed, which reads as "GBC energy on a modern screen" instead of "emulation." It keeps integer scaling clean (240×3 = 720, fits phone widths beautifully) and it lives in **one config constant** — changing to 3:5 (240×400, also tile-clean) later is a one-line edit. We'll decide with real art in front of us.
2. **The page is the Game Boy.** Phaser canvas = the screen. The buttons, bezel, and shell = HTML/CSS *around* the canvas. This gives you the pocket-taco-less mobile feel for free, keeps touch handling DOM-simple, and means desktop just hides the shell. The GBC plastic is a stylesheet, not game code.
3. **The logic core knows nothing about Phaser.** Damage math, Wane decay, the initiative queue, mastery ladders — all pure TypeScript functions and data, zero engine imports. Two payoffs: unit-testable (we'll verify the Rule of 500 with actual tests), and the battle engine becomes portable to any future engine. Phaser renders; the core decides.
4. **Everything is a table.** The design doc is secretly a database schema: typechart, moves, rites, stones, ladders, schedules, flags — JSON files validated by TypeScript interfaces. Data-driven from day one isn't just good engineering; it's the *vehicle* for learning types, because every table is a lesson in interfaces and unions.
5. **Deploy in week one.** Every milestone ships to your website. CI from the start means "is it fun yet?" is always one click away.
6. **Distribution stays open.** Web-first keeps every door unlocked: Steam later via a Tauri or Electron wrapper, app stores via Capacitor (battle-tested for Phaser) or Tauri 2. Decision deferred to Semester 4, deliberately. Dual-screen DS-alike support: parked as an elective — our UI lives in a separate Phaser scene, which is exactly what a second-canvas patch needs later.

---

## II. The Syllabus

### SEMESTER 1 — Foundations: "The Walk"
*You learn TypeScript by making the world exist.*

| Unit | You build | You learn | Done when |
|---|---|---|---|
| 0 | Dev environment: Node, VSCode, git repo, Vite+Phaser+TS template, first deploy to your site | What npm/tsconfig/Vite actually are; commit hygiene | "Hello Kon Kon" live on your website |
| 1 | A scene, a sprite, the game loop, movement | `let/const`, primitives, functions, the Phaser game loop | A fox sprite walks via arrow keys |
| 2 | Tilemaps (Tiled), collision, camera follow | Interfaces, objects, arrays, why shapes beat classes here | Kon Kon walks a real map, camera follows, walls work |
| 3 | **The follower** — Kon Kon trails the player | Classes, `this`, modules, imports/exports | The fox follows with GBC-style step-and-delay |
| 4 | **Input abstraction** — keyboard, touch buttons, gamepad behind one interface | Union types, literal types, enums, type narrowing | Same game plays on phone, keyboard, controller |
| 5 | Dialogue engine + flag store — data-driven JSON | Generics, `Record`, `keyof`, first discriminated unions | An NPC says different things based on flags |

**⚖️ Midterm — Milestone 1, "The Walk":** one map, the follower, day/night tint, one dialogue tree, all three input modes, deployed. *This is a real playable thing already.*

### SEMESTER 2 — The Battle Machine
*The heart. The hardest semester. The most TypeScript.*

| Unit | You build | You learn | Done when |
|---|---|---|---|
| 6 | Pure logic core: stats, HP, the damage formula | Modules, testing with Vitest, pure functions | Tests prove the Rule of 500 (~500÷Power hits) |
| 7 | The data tables: type chart, moves, stones | Interfaces, unions, utility types (`Partial`, `Pick`), JSON validation | All 67 moves load and typecheck |
| 8 | **The initiative queue** | Discriminated unions (`BattleCommand`), exhaustiveness checks with `never` — *the* TS lesson | Four actions resolve correctly by priority tier → speed |
| 9 | Channeler rites & Wane | State machines, state decay logic | Wane pips rise, decay, floor at 30%; Peal cancels |
| 10 | Transformation & the Band | More state machines, immutable updates | Transform costs the turn, stages persist, old form is hittable |
| 11 | Statuses, stages, Dwindle, Doom | Reducers, pure state transitions | Full status combat, Warp-tiles… no — full status combat done |

**⚖️ Final Exam — Milestone 2:** a scripted boss fight — base form + two stones, Wane visible on screen, transformation live, win/lose screens. *The game's soul, playable, ugly graphics welcome.*

### SEMESTER 3 — The Living World

| Unit | You build | You learn |
|---|---|---|
| 12 | Battle↔overworld integration; "The test is over"; full HP on exit | Cross-scene state, event buses |
| 13 | Packs — segmented HP bars, AoE, focus-fire AI | Composite state, AI state machines |
| 14 | **Foxfire Split** — saved for now deliberately; hardest system, strongest student | Advanced state: multi-actor boards |
| 15 | Save/load anywhere; save versioning/migrations | Serialization, defensive loading |
| 16 | The clock: weekdays, surges, NPC schedules & city shifts | Time-driven systems, schedule tables |
| 17 | Stone quests — the eight quest verbs | Flag-driven quest architecture |

**⚖️ Milestone 3 — The Vertical Slice:** one town, one stone quest, one scaling guardian, phone-perfect, deployed. *This is the demo skeleton.*

### SEMESTER 4 — Production & Ship

| Unit | You build | You learn |
|---|---|---|
| 18 | Content pipeline: 67 moves, 92 instances, 15+ wilds without dying | Spreadsheet→JSON tooling, data authoring at scale |
| 19 | Audio: chiptune pipeline, the Chase sting, the Hum motif | Web Audio basics |
| 20 | UX: menus, Codex, pouch, the GBC shell polish | UI scenes, tweening juice |
| 21 | Mobile QA: iOS Safari quirks, memory, texture atlases | Profiling, performance |
| 22 | Distribution: itch/site demo → Steam (Tauri/Electron) → stores (Capacitor/Tauri 2); Steam Deck / handheld verification | Packaging, platform certs |
| 23 | Public demo → playtest the Prototype Watchlist (§16 of the doc) → iterate | Reading telemetry, playtest instruments |

**⚖️ Milestone 4 — The Demo** (Next Fest-ready), then the content grind to **v1.0**. Electives thereafter: dual-screen UI, PvP "Regulation A" 🅿, NG+ kit-raising 🅿.

---

## III. The TypeScript Progression Map

```
S1: types → functions → interfaces → classes/modules → unions → narrowing
S2: generics → utility types → DISCRIMINATED UNIONS → never/exhaustiveness → pure state machines
S3: serialization → async patterns → event systems → defensive programming
S4: tooling types, config typing, reading library types without fear
```

By the vertical slice you'll be writing the kind of TypeScript mid-level engineers write — not because we drilled syntax, but because this game *is* a stack of type-shaped problems: commands that are one-of-several-kinds, tables that must validate, states that must transition legally.

## IV. Lesson Format (every unit)

1. **Lecture** — the concept, plain language, why it exists
2. **Lab** — we write the file together, line by line
3. **Break it on purpose** — I'll have you sabotage your own code and read the error; debugging fluency is half the course
4. **Challenge** — a small unguided task using *only* what you've learned
5. **Commit & deploy** — green squares, live build, always

---

**Lesson 1 (Unit 0) agenda, ready when you are:** install Node LTS → VSCode + the three extensions that matter → create the repo → scaffold Vite + Phaser + TypeScript → make the tsconfig make sense → a fox sprite on a magenta screen → push → deploy to your website. You'll finish with the skeleton every future lesson builds inside.

Say the word and we'll open the terminal. 🦊