# System Patterns — locked architecture

> The syllabus locked six architecture decisions before day one (§I). They shape every lesson and every file. Full rationale: `syllabus.md` §I. Systems detail: `design.md` §5–§11.

## The six locked architecture decisions

1. **Virtual resolution 240×320 (3:4), 16px tiles.** 15×20 tiles visible — "GBC energy on a modern screen," not emulation. Integer scaling stays clean (240×3 = 720, fits phone widths). Lives in **one config constant**; a later switch to 3:5 (240×400, also tile-clean) is a one-line edit, decided with real art in front of us.
2. **The page is the Game Boy.** The Phaser canvas is the screen; buttons, bezel, and shell are HTML/CSS *around* it. Touch handling stays DOM-simple; desktop just hides the shell. The GBC plastic is a stylesheet, not game code.
3. **The logic core knows nothing about Phaser.** Damage math, Wane decay, the initiative queue, mastery ladders — pure TypeScript functions and data, zero engine imports. Payoffs: unit-testable (the Rule of 500 gets real tests, Unit 6) and portable to any future engine. **Phaser renders; the core decides.**
4. **Everything is a table.** Typechart, moves, rites, stones, ladders, schedules, dialogue flags — JSON files validated by TypeScript interfaces. Data-driven from day one; every table is a lesson in interfaces and unions.
5. **Deploy in week one.** Every milestone ships to the website; CI from the start.
6. **Distribution stays open.** Web-first; Steam via Tauri/Electron and stores via Capacitor/Tauri 2 deferred to Semester 4. Dual-screen DS-alike UI parked as an elective (the UI lives in a separate Phaser scene — exactly what a second-canvas patch needs later).

## Target layering (the shape Unit 0 scaffolds toward)

- **Pure logic core** — zero Phaser imports, Vitest-tested. The battle engine, damage formula, Wane, initiative queue, mastery: the entire game as decisions.
- **Phaser scenes** — presentation only. They read core state and render it; they never decide.
- **Data tables + TS interfaces** — every game "fact" lives in JSON, validated at load.
- **DOM shell** — HTML/CSS Game Boy around the canvas.

(The exact repo layout is the human's to create in Unit 0. This is the agreed target shape, not scaffolding permission — see `.clinerules` §2.)

## Patterns the design demands

- **Two-actor battles:** the creature (attacks/setup) + an untargetable Channeler (rites/items/transform/Breathe). Both sides secretly pick creature move + Channeler action; all four resolve in **one initiative queue: priority tier → speed**. Transformation costs the Channeler action + that creature's attack, resolving at the Channeler's slot (old form hittable until then); stat stages persist through transformation, both sides.
- **Reducer-shaped state machines everywhere:** Wane pip decay (0–4+ pips → 100/75/55/40/30%), statuses (Daze/Sleep/Aflame/Blind/Bound/Doom/Dwindle-NN), stat stages (±6), mastery ladders (M15→M235 events) — all pure state transitions, all table-driven.
- **Foxfire Split** (Mercury): multi-actor boards — 1→2→3 bodies, split HP pool, per-body Dwindle-50, per-body stat tracking. Hardest system in the game, deliberately scheduled late (Unit 14).
- **Rule of 500 as a tested invariant:** same-level neutral mirror hits-to-KO ≈ 500 ÷ Power — the first thing Vitest proves (Unit 6).
- **Time-driven world:** 7-day planetary calendar (each planet's day weights spawns, surges shrines, shifts schedules), festival calendar, tiered NPC schedules (3–5 featured per town; cities run shifts; Aldebaran is 24-hour). In-game time only, seeded once at file creation; no time-travel flags — events are events.
- **Systems build order** (`design.md` §14): battle loop → Channeler/Wane → transformation → mastery → packs → split → clock/calendar → schedules → Greeter dogs → reputation/flags → Ledger.

## Danger list

The **Prototype Watchlist** (`design.md` §16): Wane interference of any kind, 3-body split output (1.5×), clone×Doom/Leech/stages, Barbs, Matriarch's Nine, the Mirror fight, attuned battle entry, Mercury's pre-M175 pack game, Renew spam, Ward+Endure turtling, Daze ubiquity (5 carriers), Rally cut candidate, the L15 road-corridor guardian rush (keep — it's the knowledge-is-the-unlock promise), Greeter-dog follow loop. Anything touching the Wane economy goes on this list automatically.
